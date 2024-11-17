import { AppDataSource } from '../../core/data-source';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';
import { Produtor } from './entities/produtor.entity';

/**
 * Class ProdutorService
 */
export class ProdutorService {
  private readonly produtor = AppDataSource.getRepository(Produtor);

  /**
   * Criação de um novo registro
   *
   * @param dto => Informações do registro
   * @returns Retorna o registro cadastrado
   */
  async create(dto: CreateProdutorDTO): Promise<Produtor> {
    return await this.produtor.save(dto);
  }

  /**
   * Consulta todos os registros
   *
   * @returns Retorna todos os registros encontrados
   */
  async findAll(): Promise<Produtor[]> {
    return await this.produtor.find({ where: { deleted: false } });
  }

  /**
   * Consulta um registro pelo id
   *
   * @param id => Id do registro para consultar
   * @returns Retorna o registro
   */
  async findOne(id: string): Promise<Produtor | null> {
    return await this.produtor.findOne({ where: { id, deleted: false } });
  }

  /**
   * Atualiza um registro pelo id
   *
   * @param id => Id do registro para atualizar
   * @param dto => Informações para atualizar
   * @returns Retorna o registro atualizado
   */
  async update(id: string, dto: UpdateProdutorDTO): Promise<Produtor | null> {
    await this.produtor.update({ id }, dto);

    return await this.produtor.findOne({ where: { id, deleted: false } });
  }

  /**
   * Remove um registro pelo id
   *
   * @param id => Id do registro para remover
   */
  async remove(id: string): Promise<void> {
    await this.produtor.update({ id }, { deleted: true });
  }
}
