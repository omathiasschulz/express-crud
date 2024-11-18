import { ProdutorService } from './produtor.service';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { BadRequestError } from '../../core/api-error';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';
import { Produtor } from './entities/produtor.entity';

// mock do repositório
const produtorRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  findAndCount: jest.fn(),
  update: jest.fn(),
};

// substitui o import por um mock pré definido
jest.mock('../../core/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => produtorRepository),
  },
}));

describe('ProdutorService', () => {
  let produtorService: ProdutorService;

  beforeEach(() => {
    jest.clearAllMocks();
    produtorService = new ProdutorService();
  });

  describe('create', () => {
    it('deve cadastrar um produtor com sucesso', async () => {
      const dto: CreateProdutorDTO = {
        cpf_cnpj: '86559160000190',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
      };
      const produtor: Produtor = {
        ...dto,
        id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false,
      };

      // findOne ao ser chamado retorna uma promise resolvida com o valor null
      produtorRepository.findOne.mockResolvedValue(null);
      produtorRepository.save.mockResolvedValue(produtor);

      const result = await produtorService.create(dto);

      expect(produtorRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(produtor);
    });

    it('deve lançar um erro se o CPF for inválido', async () => {
      const dto: CreateProdutorDTO = {
        cpf_cnpj: '11122233344',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
      };

      await expect(produtorService.create(dto)).rejects.toThrow(
        `O CPF ${cpf.format(dto.cpf_cnpj)} é inválido!`,
      );
    });

    it('deve lançar um erro se o CNPJ for inválido', async () => {
      const dto: CreateProdutorDTO = {
        cpf_cnpj: '11112222333344',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
      };

      await expect(produtorService.create(dto)).rejects.toThrow(
        new BadRequestError(`O CNPJ ${cnpj.format(dto.cpf_cnpj)} é inválido!`),
      );
    });

    it('deve lançar erro se o CPF já estiver cadastrado', async () => {
      const dto: CreateProdutorDTO = {
        cpf_cnpj: '25964013040',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
      };

      produtorRepository.findOne.mockResolvedValue(dto);

      await expect(produtorService.create(dto)).rejects.toThrow(
        new BadRequestError(
          `O CPF ${cpf.format(dto.cpf_cnpj)} já está cadastrado!`,
        ),
      );
    });

    it('deve lançar erro se o CNPJ já estiver cadastrado', async () => {
      const dto: CreateProdutorDTO = {
        cpf_cnpj: '86559160000190',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
      };

      produtorRepository.findOne.mockResolvedValue(dto);

      await expect(produtorService.create(dto)).rejects.toThrow(
        new BadRequestError(
          `O CNPJ ${cnpj.format(dto.cpf_cnpj)} já está cadastrado!`,
        ),
      );
    });

    it('deve lançar erro se áreas (agricultável + vegetação) ser maior que a área total', async () => {
      const dto: CreateProdutorDTO = {
        cpf_cnpj: '86559160000190',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 10,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
      };

      produtorRepository.findOne.mockResolvedValue(null);

      await expect(produtorService.create(dto)).rejects.toThrow(
        new BadRequestError(
          `A soma das áreas agricultável e vegetação não deve ser maior que a área total da fazenda!`,
        ),
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtores', async () => {
      const data: Produtor[] = [
        {
          id: '1',
          cpf_cnpj: '86559160000190',
          nome: 'Fulano com Sobrenome',
          cidade: 'Ibirama',
          sigla_uf: 'SC',
          nome_fazenda: 'Fazenda do Fulano',
          total_ha_fazenda: 20,
          total_agricultavel_ha_fazenda: 5.5,
          total_vegetacao_ha_fazenda: 9.99,
          culturas_fazenda: ['milho', 'soja'],
          created_at: new Date(),
          updated_at: new Date(),
          deleted: false,
        },
      ];
      const total = 1;
      produtorRepository.findAndCount.mockResolvedValue([data, total]);

      const result = await produtorService.findAll();

      expect(result.results).toEqual(data);
      expect(result.total).toBe(total);
    });
  });

  describe('findOne', () => {
    it('deve retornar um produtor pelo id', async () => {
      const produtor: Produtor = {
        id: '1',
        cpf_cnpj: '86559160000190',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false,
      };
      produtorRepository.findOne.mockResolvedValue(produtor);

      const result = await produtorService.findOne('1');

      expect(result).toEqual(produtor);
    });

    it('deve lançar erro se o produtor não for encontrado', async () => {
      produtorRepository.findOne.mockResolvedValue(null);

      await expect(produtorService.findOne('1')).rejects.toThrow(
        new BadRequestError(`Produtor com id 1 não encontrado!`),
      );
    });
  });

  describe('update', () => {
    it('deve atualizar um produtor com sucesso', async () => {
      const produtor: Produtor = {
        id: '1',
        cpf_cnpj: '86559160000190',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false,
      };

      const dto: UpdateProdutorDTO = {
        nome: 'Fulano com Sobrenome Atualizado',
        culturas_fazenda: ['milho', 'soja', 'cana_acucar'],
      };

      produtorRepository.findOne.mockResolvedValue(produtor);
      produtorRepository.update.mockResolvedValue(null);
      produtorRepository.findOne.mockResolvedValue({
        ...produtor,
        ...dto,
      });

      const result = await produtorService.update('1', dto);

      expect(result).toEqual({ ...produtor, ...dto });
    });

    it('deve lançar erro se o produtor não for encontrado', async () => {
      const dto: UpdateProdutorDTO = {
        nome: 'Fulano com Sobrenome Atualizado',
      };
      produtorRepository.findOne.mockResolvedValue(null);

      await expect(produtorService.update('1', dto)).rejects.toThrow(
        new BadRequestError(`Produtor com id 1 não encontrado!`),
      );
    });

    it('deve lançar erro se áreas (agricultável + vegetação) ser maior que a área total', async () => {
      const produtor: Produtor = {
        id: '1',
        cpf_cnpj: '86559160000190',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja'],
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false,
      };
      const dto: UpdateProdutorDTO = {
        nome: 'Fulano com Sobrenome Atualizado',
        total_ha_fazenda: 10,
        culturas_fazenda: ['milho', 'soja', 'cana_acucar'],
      };

      produtorRepository.findOne.mockResolvedValue(produtor);

      await expect(produtorService.update('1', dto)).rejects.toThrow(
        new BadRequestError(
          `A soma das áreas agricultável e vegetação não deve ser maior que a área total da fazenda!`,
        ),
      );
    });
  });

  describe('remove', () => {});

  describe('dashboard', () => {});
});
