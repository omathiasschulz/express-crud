import { AppDataSource } from '../../core/data-source';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';
import { Produtor } from './entities/produtor.entity';

/**
 * Class ProdutorService
 */
export class ProdutorService {
  private readonly produtor = AppDataSource.getRepository(Produtor);

  async create(dto: CreateProdutorDTO): Promise<Produtor> {
    return await this.produtor.save(dto);
  }

  async findAll(): Promise<Produtor[]> {
    return await this.produtor.find({ where: { deleted: false } });
  }

  async findOne(id: string): Promise<Produtor | null> {
    return await this.produtor.findOne({ where: { id, deleted: false } });
  }

  async update(id: string, dto: UpdateProdutorDTO) {
    await this.produtor.update({ id }, dto);

    return await this.produtor.findOne({ where: { id, deleted: false } });
  }

  async remove(id: string): Promise<void> {
    await this.produtor.update({ id }, { deleted: true });
  }
}
