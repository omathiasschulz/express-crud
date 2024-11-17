import { AppDataSource } from '../../core/data-source';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { Produtor } from './entities/produtor.entity';

export class ProdutorService {
  private readonly produtor = AppDataSource.getRepository(Produtor);

  async create(dto: CreateProdutorDTO): Promise<Produtor> {
    return await this.produtor.save(dto);
  }

  findAll() {
    return true;
  }

  findOne(id: number) {
    return true;
  }

  update(id: number, updatePostDto: any) {
    return true;
  }

  remove(id: number) {
    return true;
  }
}
