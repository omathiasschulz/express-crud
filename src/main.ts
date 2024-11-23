import { AppDataSource } from './core/data-source';
import { Server } from './core/server';
import ProdutorRouter from './modules/produtor/produtor.route';

export const startApi = () => {
  const server = new Server({
    port: 3000,
  });

  /**
   * Construção das rotas
   */
  server.addRoutes(ProdutorRouter);

  server.start();

  return server;
};

const server = startApi();

// @TODO: Ajustar
// AppDataSource.initialize();

// server.getApp().listen(3000, () => {
//   console.info(`Server running on port ${3000}...`);
// });

server.getApp().listen(3000);
