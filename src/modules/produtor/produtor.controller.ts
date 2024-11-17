import { type Request, type Response } from 'express';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';

/**
 * Class ProdutorController
 */
class ProdutorController {
  private readonly produtorService = new ProdutorService();

  /**
   * Criação de um novo registro
   */
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

  /**
   * Consulta todos os registros
   */
  findAll = async ({}: Request, res: Response): Promise<void> => {
    const produtores = await this.produtorService.findAll();
    res.status(200).json(produtores);
  };

  /**
   * Consulta um registro pelo id
   */
  findOne = async ({ params }: Request, res: Response): Promise<void> => {
    const produtor = await this.produtorService.findOne(params._id);
    res.status(200).json(produtor);
  };

  /**
   * Atualiza um registro pelo id
   */
  update = async ({ body, params }: Request, res: Response): Promise<void> => {
    try {
      const dto = plainToInstance(UpdateProdutorDTO, body);
      await validateOrReject(dto);

      const produtor = await this.produtorService.update(params._id, dto);
      res.status(201).json(produtor);
    } catch (err: any) {
      res.status(400).json({ error: err?.message ?? 'Falha', details: err });
    }
  };

  /**
   * Remove um registro pelo id
   */
  remove = async ({ params }: Request, res: Response): Promise<void> => {
    await this.produtorService.remove(params._id);
    res.sendStatus(200);
  };
}
export default new ProdutorController();
