import { type Request, type Response, type NextFunction } from 'express';
import { ProdutorService } from './produtor.service';
import { CreateProdutorDTO } from './dtos/create-produtor.dto';
import { UpdateProdutorDTO } from './dtos/update-produtor.dto';
import { HttpCode } from '../../enums/http-code.enum';
import { validateDto } from '../../core/validate-dto';

/**
 * Class ProdutorController
 *
 * @swagger
 * tags:
 *   name: Produtores
 *   description: Gerenciamento de produtores rurais
 */
class ProdutorController {
  private readonly produtorService = new ProdutorService();

  /**
   * Criação de um novo registro
   *
   * @swagger
   * /produtor:
   *   post:
   *     summary: Criação de um novo produtor
   *     tags: [Produtores]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProdutorSchema'
   *     responses:
   *       201:
   *         description: Produtor criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProdutorSchema'
   *       400:
   *         description: Dados inválidos
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
   *
   * @swagger
   * /produtor:
   *   get:
   *     summary: Lista todos os produtores
   *     tags: [Produtores]
   *     responses:
   *       200:
   *         description: Lista de produtores
   *         headers:
   *           X-Total-Count:
   *             description: Número total de registros
   *             schema:
   *               type: integer
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ProdutorSchema'
   */
  findAll = async (
    {}: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.produtorService.findAll();

      res.setHeader('X-Total-Count', data.total);
      res.status(HttpCode.OK).json(data.results);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Consulta um registro pelo id
   *
   * @swagger
   * /produtor/{id}:
   *   get:
   *     summary: Consulta um produtor pelo ID
   *     tags: [Produtores]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do produtor
   *     responses:
   *       200:
   *         description: Detalhes do produtor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProdutorSchema'
   *       404:
   *         description: Produtor não encontrado
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
   *
   * @swagger
   * /produtor/{id}:
   *   patch:
   *     summary: Atualiza um produtor pelo ID
   *     tags: [Produtores]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do produtor
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateProdutorSchema'
   *     responses:
   *       200:
   *         description: Produtor atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ProdutorSchema'
   *       400:
   *         description: Dados inválidos
   *       404:
   *         description: Produtor não encontrado
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
   *
   * @swagger
   * /produtor/{id}:
   *   delete:
   *     summary: Remove um produtor pelo ID
   *     tags: [Produtores]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do produtor
   *     responses:
   *       200:
   *         description: Produtor removido com sucesso
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
   *
   * @swagger
   * /produtor/dashboard:
   *   get:
   *     summary: Informações para dashboard
   *     tags: [Produtores]
   *     responses:
   *       200:
   *         description: Informações
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DashboardProdutorSchema'
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
