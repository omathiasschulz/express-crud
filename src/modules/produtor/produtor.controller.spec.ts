import request from 'supertest';
import { HttpCode } from '../../enums/http-code.enum';
import { startApi } from '../../main';
import { ProdutorService } from './produtor.service';
import { Produtor } from './entities/produtor.entity';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';

jest.mock('./produtor.service');

const server = startApi();
const app = server.getApp();

describe('ProdutorController', () => {
  let produtorServiceMock: jest.Mocked<ProdutorService>;

  beforeEach(() => {
    produtorServiceMock = new ProdutorService() as jest.Mocked<ProdutorService>;
  });

  it('Deve criar um novo produtor com sucesso', async () => {
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

    produtorServiceMock.create.mockResolvedValue(produtor);

    const response = await request(app).post('/produtor').send(dto);

    expect(response.status).toBe(HttpCode.CREATED);
    expect(response.body).toEqual(produtor);
  });

  // it('Deve retornar erro ao tentar criar um produtor com CPF inválido', async () => {
  //   // Mock do comportamento para CPF inválido
  //   produtorServiceMock.create.mockRejectedValueOnce(new Error('CPF inválido'));

  //   const response = await request(app).post('/produtor').send({
  //     cpf_cnpj: '123456789',
  //     nome: 'Produtor Invalido',
  //   });

  //   expect(response.status).toBe(HttpCode.BAD_REQUEST);
  //   expect(response.body.message).toBe('CPF inválido');
  // });

  // it('Deve listar todos os produtores', async () => {
  //   // Mock do comportamento para o findAll
  //   const mockData = {
  //     results: [
  //       {
  //         id: '1',
  //         cpf_cnpj: '86559160000190',
  //         nome: 'Fulano com Sobrenome',
  //         cidade: 'Ibirama',
  //         sigla_uf: 'SC',
  //         nome_fazenda: 'Fazenda do Fulano',
  //         total_ha_fazenda: 20,
  //         total_agricultavel_ha_fazenda: 5.5,
  //         total_vegetacao_ha_fazenda: 9.99,
  //         culturas_fazenda: ['milho', 'soja'],
  //         created_at: new Date(),
  //         updated_at: new Date(),
  //         deleted: false,
  //       },
  //     ],
  //     total: 1,
  //   };
  //   produtorServiceMock.findAll.mockResolvedValue(mockData);

  //   const response = await request(app).get('/produtor');
  //   // console.log('response');
  //   // console.log(response);
  //   console.log('response.status');
  //   console.log(response.status);
  //   console.log('response.body');
  //   console.log(response.body);

  //   expect(response.status).toBe(HttpCode.OK);
  //   // expect(response.body).toEqual(mockData.results);
  //   // expect(response.headers['x-total-count']).toBe(mockData.total.toString());
  // });

  // it('Deve retornar 404 caso o produtor não seja encontrado', async () => {
  //   // Mock para o método findOne retornando null (não encontrado)
  //   produtorServiceMock.findOne.mockResolvedValue(null);

  //   const response = await request(app).get('/produtor/1');

  //   expect(response.status).toBe(HttpCode.BAD_REQUEST);
  //   expect(response.body.message).toBe('Produtor com id 1 não encontrado!');
  // });

  // it('Deve atualizar um produtor com sucesso', async () => {
  //   // Mock para o método update
  //   const mockProdutor = { id: '1', nome: 'Produtor Atualizado' };
  //   produtorServiceMock.update.mockResolvedValue(mockProdutor);

  //   const response = await request(app)
  //     .patch('/produtor/1')
  //     .send({ nome: 'Produtor Atualizado' });

  //   expect(response.status).toBe(HttpCode.OK);
  //   expect(response.body).toEqual(mockProdutor);
  // });

  // it('Deve remover um produtor com sucesso', async () => {
  //   // Mock para o método remove
  //   produtorServiceMock.remove.mockResolvedValue(undefined);

  //   const response = await request(app).delete('/produtor/1');

  //   expect(response.status).toBe(HttpCode.OK);
  // });
});
