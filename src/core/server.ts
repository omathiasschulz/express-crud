import express, { type Request, type Response, type Router } from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';

interface ServerOptions {
  port: number;
}

/**
 * Class Server
 */
export class Server {
  private readonly app = express();
  private readonly port: number;

  constructor({ port }: ServerOptions) {
    this.port = port;
  }

  /**
   * Inicia o servidor e aplica as configurações iniciais
   */
  async start(): Promise<void> {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());

    this.app.get('/', (_req: Request, res: Response) => {
      res.status(200).json({
        message: 'The API is up and running!',
      });
    });

    // conexão com o banco de dados
    AppDataSource.initialize()
      .then(() => console.info('Connected with database...'))
      .catch((error) => console.error(error));

    this.app.listen(this.port, () => {
      console.info(`Server running on port ${this.port}...`);
    });
  }

  /**
   * Realiza a construção das rotas de um novo módulo
   *
   * @param router
   */
  async build(router: Router): Promise<void> {
    this.app.use(router);
  }
}
