import { type Request, type Response, type NextFunction } from 'express';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';
import { HttpCode } from '../../enums/http-code.enum';
import { validateDto } from '../../core/validate-dto';

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
      const dto = await validateDto(CreateProdutorDTO, body);

      const produtor = await this.produtorService.create(dto);
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
      const dto = await validateDto(UpdateProdutorDTO, body);

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

  /**
   * Consulta informações para montagem da dashboard
   */
  dashboard = async (
    {}: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.produtorService.dashboard();
      res.status(HttpCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
export default new ProdutorController();
