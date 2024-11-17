import { type Request, type Response, type NextFunction } from 'express';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';
import { HttpCode } from '../../enums/http-code.enum';

/**
 * Class ProdutorController
 */
class ProdutorController {
  private readonly produtorService = new ProdutorService();

  /**
   * Criação de um novo registro
   */
  create = async (
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dto = plainToInstance(CreateProdutorDTO, body);
      await validateOrReject(dto);

      const produtor = await this.produtorService.create(body);
      res.status(HttpCode.CREATED).json(produtor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Consulta todos os registros
   */
  findAll = async (
    {}: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log(new Date());
      console.log(new Date().toISOString());
      console.log(new Date().toLocaleTimeString());

      const produtores = await this.produtorService.findAll();
      res.status(HttpCode.OK).json(produtores);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Consulta um registro pelo id
   */
  findOne = async (
    { params: { _id } }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const produtor = await this.produtorService.findOne(_id);
      res.status(HttpCode.OK).json(produtor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Atualiza um registro pelo id
   */
  update = async (
    { body, params: { _id } }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dto = plainToInstance(UpdateProdutorDTO, body);
      await validateOrReject(dto);

      const produtor = await this.produtorService.update(_id, dto);
      res.status(HttpCode.OK).json(produtor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Remove um registro pelo id
   */
  remove = async (
    { params }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.produtorService.remove(params._id);
      res.sendStatus(HttpCode.OK);
    } catch (error) {
      next(error);
    }
  };
}
export default new ProdutorController();
