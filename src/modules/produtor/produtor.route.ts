import { Router } from 'express';
import ProdutorController from './produtor.controller';

const ProdutorRouter = Router();

ProdutorRouter.route('/produtor')
  .get(ProdutorController.findAll)
  .post(ProdutorController.create);

ProdutorRouter.route('/produtor/:_id([0-9]+)')
  .get(ProdutorController.findOne)
  .patch(ProdutorController.update)
  .delete(ProdutorController.remove);

ProdutorRouter.route('/produtor/dashboard').get(ProdutorController.dashboard);

export default ProdutorRouter;
