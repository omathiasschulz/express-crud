import { type Request, type Response } from 'express';

class ProdutorController {
  async create(req: Request, res: Response): Promise<void> {
    const { body, params } = req;
    res.status(201).json({});
  }

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
