import * as core from 'express-serve-static-core';
import express, {
  type Request,
  type Response,
  type Router,
  type NextFunction,
} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './data-source';
import { errorHandler } from './error-handler';
import { NotFoundError } from './api-error';
import { HttpCode } from '../enums/http-code.enum';
import swaggerSpec from '../swagger/swagger';

interface ServerOptions {
  port: number;
}

/**
 * Class Server
 */
export class Server {
  private readonly app: core.Express = express();
  private readonly port: number;
  private readonly routes: Router[] = [];

  constructor({ port }: ServerOptions) {
    this.port = port;
  }

  /**
   * Inicia o servidor e aplica as configurações iniciais
   *
   * @param testMode => Determina se inicia a aplicação em modo de teste
   */
  async start(testMode = false): Promise<void> {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());

    this.app.get('/', (_req: Request, res: Response) => {
      res.status(HttpCode.OK).json({
        message: 'A API está rodando!',
      });
    });

    // documentação swagger
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // adiciona as rotas da aplicação
    this.routes.map((route: Router) => {
      this.app.use(route);
    });

    // retorno agradável para rotas não encontradas
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      next(
        new NotFoundError(
          `Rota ${req.method} [${req.originalUrl}] não foi encontrada!`,
        ),
      );
    });

    // tratamento dos erros
    this.app.use(errorHandler);

    if (testMode) return;

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

  /**
   * Get express app
   *
   * @returns Express app
   */
  getApp(): core.Express {
    return this.app;
  }
}
