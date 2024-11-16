import { Router } from 'express';
import ProdutorController from './produtor.controller';

const ProdutorRouter = Router();

ProdutorRouter.route('/produtor')
  .get(ProdutorController.findAll)
  .post(ProdutorController.create);

ProdutorRouter.route('/registro/:_id')
  .get(ProdutorController.findOne)
  .put(ProdutorController.update)
  .delete(ProdutorController.remove);

export default ProdutorRouter;
