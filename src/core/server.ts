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
  private readonly routes: Router[] = [];

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

    // adiciona as rotas da aplicação
    this.routes.map((route: Router) => {
      this.app.use(route);
    });

    this.app.get('*', (_req: Request, res: Response) => {
      res.status(404).json({ message: '404 Not Found' });
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
   * Realiza a construção das rotas de novos módulos
   *
   * @param routes
   */
  async addRoutes(...routes: Router[]): Promise<void> {
    this.routes.push(...routes);
  }
}
