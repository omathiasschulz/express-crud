import { type Request, type Response } from 'express';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

class ProdutorController {
  private readonly produtorService = new ProdutorService();

  create = async ({ body }: Request, res: Response): Promise<void> => {
    try {
      const dto = plainToInstance(CreateProdutorDTO, body);
      await validateOrReject(dto);

      const produtor = await this.produtorService.create(body);
      res.status(201).json(produtor);
    } catch (err: any) {
      res.status(400).json({ error: err?.message ?? 'Falha', details: err });
    }
  };

  async findAll(req: Request, res: Response): Promise<void> {
    const { body, params } = req;
    res.status(200).json({});
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const { body, params } = req;
    res.status(200).json({});
  }

  async update(req: Request, res: Response): Promise<void> {
    const { body, params } = req;
    res.status(200).json({});
  }

  async remove(req: Request, res: Response): Promise<void> {
    const { body, params } = req;
    res.status(200).json({});
  }
}
export default new ProdutorController();
