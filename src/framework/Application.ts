import http, { Server } from 'http';
import EventEmitter from 'events';

import Router from './Router';
import { getRouteMask } from './helpers';

class Application {
  emitter: EventEmitter;

  server: Server;

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
  }

  listen(port: number, callback: () => void) {
    this.server.listen(port, callback);
  }

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];

        this.emitter.on(getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  private createServer() {
    const server = http.createServer((req, res) => {
      const routeMask = getRouteMask(req.url, req.method);
      const emitted = this.emitter.emit(routeMask, req, res);

      if (!emitted) {
        res.end();
      }
    });

    return server;
  }
}

export default Application;
