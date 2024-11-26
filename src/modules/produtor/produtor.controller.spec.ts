import request from 'supertest';
import { HttpCode } from '../../enums/http-code.enum';
import { Produtor } from './entities/produtor.entity';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { CulturasPlantadas } from './enums/culturas.enum';
import { BadRequestError } from '../../core/api-error';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';
import { ProdutorDashboard } from './interfaces/dashboard.interface';
import { startApi } from '../../config';

jest.mock('./produtor.service', () => {
  // métodos mock que simulam os métodos reais do ProdutorService
  const produtorServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  return {
    // mock da classe ProdutorService
    // sempre que houver um 'new ProdutorService()' recebe o objeto produtorServiceMock como instância
    ProdutorService: jest.fn().mockImplementation(() => produtorServiceMock),
    // retorna o objeto mock para simular as respostas dos métodos
    produtorServiceMock,
  };
});
const { produtorServiceMock } = jest.requireMock('./produtor.service');

// inicia a aplicação no modo teste
const server = startApi(true);
const app = server.getApp();

describe('ProdutorController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted: false,
      };
      produtorServiceMock.create = jest.fn().mockResolvedValue(produtor);
      const response = await request(app).post('/produtor').send(dto);

      expect(response.status).toBe(HttpCode.CREATED);
      expect(produtorServiceMock.create).toHaveBeenCalledWith(dto);
      expect(response.body).toEqual(produtor);
    });

    it('deve lançar um erro se o DTO possuir dados inválidos', async () => {
      const dto: CreateProdutorDTO = {
        cpf_cnpj: '86559160000190',
        nome: 'Fulano com Sobrenome',
        cidade: 'Ibirama',
        sigla_uf: 'SC',
        nome_fazenda: 'Fazenda do Fulano',
        total_ha_fazenda: 20,
        total_agricultavel_ha_fazenda: 5.5,
        total_vegetacao_ha_fazenda: 9.99,
        culturas_fazenda: ['milho', 'soja', 'cultura_invalida'],
      };
      const response = await request(app).post('/produtor').send(dto);

      expect(response.status).toBe(HttpCode.BAD_REQUEST);
      expect(produtorServiceMock.create).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        message: `Preencha todos os campos corretamente: culturas_fazenda opções aceitas: ${Object.values(CulturasPlantadas).join(', ')}`,
      });
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtores', async () => {
      const results: Produtor[] = [
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted: false,
        },
      ];
      const total = 1;
      produtorServiceMock.findAll = jest
        .fn()
        .mockResolvedValue({ results, total });
      const response = await request(app).get('/produtor');

      expect(response.status).toBe(HttpCode.OK);
      expect(response.body).toEqual(results);
      expect(response.headers['x-total-count']).toBe(total.toString());
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted: false,
      };
      produtorServiceMock.findOne = jest.fn().mockResolvedValue(produtor);
      const response = await request(app).get('/produtor/1');

      expect(response.status).toBe(HttpCode.OK);
      expect(response.body).toEqual(produtor);
    });

    it('deve lançar erro se o produtor não for encontrado', async () => {
      produtorServiceMock.findOne = jest
        .fn()
        .mockRejectedValue(
          new BadRequestError(`Produtor com id 1 não encontrado!`),
        );
      const response = await request(app).get(`/produtor/1`);

      expect(response.status).toBe(HttpCode.BAD_REQUEST);
      expect(response.body).toEqual({
        message: `Produtor com id 1 não encontrado!`,
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um produtor com sucesso', async () => {
      const dto: UpdateProdutorDTO = {
        nome: 'Fulano com Sobrenome Atualizado',
        culturas_fazenda: ['milho', 'soja', 'cana_acucar'],
      };
      const produtorAtualizado: Produtor = {
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted: false,
        ...dto,
      };
      produtorServiceMock.update = jest
        .fn()
        .mockResolvedValue(produtorAtualizado);
      const response = await request(app).patch('/produtor/1').send(dto);

      expect(response.status).toBe(HttpCode.OK);
      expect(produtorServiceMock.update).toHaveBeenCalledWith('1', dto);
      expect(response.body).toEqual(produtorAtualizado);
    });

    it('deve lançar erro se o produtor não for encontrado', async () => {
      const dto: UpdateProdutorDTO = {
        nome: 'Fulano com Sobrenome Atualizado',
        culturas_fazenda: ['milho', 'soja', 'cana_acucar'],
      };
      produtorServiceMock.update = jest
        .fn()
        .mockRejectedValue(
          new BadRequestError(`Produtor com id 1 não encontrado!`),
        );
      const response = await request(app).patch('/produtor/1').send(dto);

      expect(response.status).toBe(HttpCode.BAD_REQUEST);
      expect(produtorServiceMock.update).toHaveBeenCalledWith('1', dto);
      expect(response.body).toEqual({
        message: `Produtor com id 1 não encontrado!`,
      });
    });

    it('deve lançar um erro se o DTO possuir dados inválidos', async () => {
      const dto: UpdateProdutorDTO = {
        nome: 'Fulano com Sobrenome Atualizado',
        culturas_fazenda: ['milho', 'soja', 'cultura_invalida'],
      };
      const response = await request(app).patch('/produtor/1').send(dto);

      expect(response.status).toBe(HttpCode.BAD_REQUEST);
      expect(produtorServiceMock.update).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        message: `Preencha todos os campos corretamente: culturas_fazenda opções aceitas: ${Object.values(CulturasPlantadas).join(', ')}`,
      });
    });
  });

  describe('remove', () => {
    it('deve remover um produtor marcando como deletado', async () => {
      produtorServiceMock.remove = jest.fn().mockResolvedValue(null);
      const response = await request(app).delete(`/produtor/1`);

      expect(response.status).toBe(HttpCode.OK);
      expect(produtorServiceMock.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('dashboard', () => {
    it('deve retornar as informações para a dashboard', async () => {
      const dashboard: ProdutorDashboard = {
        quantidadeFazendas: 4,
        areaTotalFazendas: 80,
        fazendasPorEstado: [{ sigla_uf: 'SC', quantidadeFazendas: 4 }],
        fazendasPorCultura: [{ cultura: 'Soja', quantidadeFazendas: 4 }],
        usoSolo: { totalAgricultavel: 11, totalVegetacao: 48 },
      };
      produtorServiceMock.dashboard = jest.fn().mockResolvedValue(dashboard);
      const response = await request(app).get(`/produtor/dashboard`);

      expect(response.status).toBe(HttpCode.OK);
      expect(produtorServiceMock.dashboard).toHaveBeenCalled();
      expect(response.body).toEqual(dashboard);
    });
  });
});
