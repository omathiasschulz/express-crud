import { Server } from './core/server';
import ProdutorRouter from './modules/produtor/produtor.route';

const server = new Server({
  port: 3000,
});
server.start();

/**
 * Construção das rotas
 */
server.build(ProdutorRouter);
