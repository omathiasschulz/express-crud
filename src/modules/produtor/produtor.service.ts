import { cnpj, cpf } from 'cpf-cnpj-validator';
import { BadRequestError } from '../../core/api-error';
import { AppDataSource } from '../../core/data-source';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';
import { Produtor } from './entities/produtor.entity';

/**
 * Class ProdutorService
 */
export class ProdutorService {
  private readonly QTD_CARACTERES_CPF = 11;

  private readonly produtor = AppDataSource.getRepository(Produtor);

  /**
   * Criação de um novo registro
   *
   * @param dto => Informações do registro
   * @returns Retorna o registro cadastrado
   */
  async create(dto: CreateProdutorDTO): Promise<Produtor> {
    // valida se o cpf/cnpj é válido
    if (dto.cpf_cnpj.length === this.QTD_CARACTERES_CPF) {
      if (!cpf.isValid(dto.cpf_cnpj)) {
        throw new BadRequestError(
          `O CPF ${cpf.format(dto.cpf_cnpj)} é inválido!`,
        );
      }
    } else {
      if (!cnpj.isValid(dto.cpf_cnpj)) {
        throw new BadRequestError(
          `O CNPJ ${cnpj.format(dto.cpf_cnpj)} é inválido!`,
        );
      }
    }

    // valida se o cpf/cnpj já está inserido
    if (
      await this.produtor.findOne({
        where: { cpf_cnpj: dto.cpf_cnpj },
      })
    ) {
      if (dto.cpf_cnpj.length === this.QTD_CARACTERES_CPF) {
        throw new BadRequestError(
          `O CPF ${cpf.format(dto.cpf_cnpj)} já está cadastrado!`,
        );
      }
      throw new BadRequestError(
        `O CNPJ ${cnpj.format(dto.cpf_cnpj)} já está cadastrado!`,
      );
    }

    // valida a soma das áreas da fazenda
    if (
      dto.total_agricultavel_ha_fazenda + dto.total_vegetacao_ha_fazenda >
      dto.total_ha_fazenda
    ) {
      throw new BadRequestError(
        `A soma das áreas agrícultável e vegetação não deve ser maior que a área total da fazenda!`,
      );
    }

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
    const model = await this.produtor.findOne({
      where: { id, deleted: false },
    });
    if (!model) {
      throw new BadRequestError(`Produtor com id ${id} não encontrado!`);
    }
    return model;
  }

  /**
   * Atualiza um registro pelo id
   *
   * @param id => Id do registro para atualizar
   * @param dto => Informações para atualizar
   * @returns Retorna o registro atualizado
   */
  async update(id: string, dto: UpdateProdutorDTO): Promise<Produtor | null> {
    const model = await this.produtor.findOne({
      where: { id, deleted: false },
    });
    if (!model) {
      throw new BadRequestError(`Produtor com id ${id} não encontrado!`);
    }

    // valida se existe alteração nas áreas da fazenda
    if (
      dto.total_agricultavel_ha_fazenda ||
      dto.total_vegetacao_ha_fazenda ||
      dto.total_ha_fazenda
    ) {
      model.total_agricultavel_ha_fazenda =
        dto.total_agricultavel_ha_fazenda ??
        model.total_agricultavel_ha_fazenda;
      model.total_vegetacao_ha_fazenda =
        dto.total_vegetacao_ha_fazenda ?? model.total_vegetacao_ha_fazenda;
      model.total_ha_fazenda = dto.total_ha_fazenda ?? model.total_ha_fazenda;

      // valida a soma das áreas da fazenda
      if (
        model.total_agricultavel_ha_fazenda + model.total_vegetacao_ha_fazenda >
        model.total_ha_fazenda
      ) {
        throw new BadRequestError(
          `A soma das áreas agrícultável e vegetação não deve ser maior que a área total da fazenda!`,
        );
      }
    }

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
