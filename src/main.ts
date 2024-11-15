import { Server } from './server';

(function (): void {
  const server = new Server({
    port: 3000,
  });

  server.start();
})();
