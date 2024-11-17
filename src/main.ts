import { Server } from './core/server';
import ProdutorRouter from './modules/produtor/produtor.route';

const server = new Server({
  port: 3000,
});

/**
 * Construção das rotas
 */
server.addRoutes(ProdutorRouter);

server.start();
