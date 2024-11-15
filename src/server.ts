import express, { type Request, type Response } from 'express';
import cors from 'cors';

interface ServerOptions {
  port: number;
}

export class Server {
  private readonly app = express();
  private readonly port: number;

  constructor({ port }: ServerOptions) {
    this.port = port;
  }

  async start(): Promise<void> {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());

    this.app.get('/', (_req: Request, res: Response) => {
      res.status(200).json({
        message: 'The API is up and running!',
      });
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}...`);
    });
  }
}
