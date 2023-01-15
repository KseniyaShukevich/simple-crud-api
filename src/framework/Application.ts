import http, { Server } from 'http';
import EventEmitter from 'events';

import Router from './Router';
import { getRouteMask } from './helpers';
import RequestMethods from './requestMethods';
import Middleware from './middlewares/middlewareType';
import RequestType from './RequestType';
import ServerResponseType from './ServerResponseType';

class Application {
  emitter: EventEmitter;

  server: Server;

  middlewares: Array<Middleware>;

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
    this.middlewares = [];
  }

  public listen(port: number, callback: () => void) {
    this.server.listen(port, callback);
  }

  public addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method as RequestMethods];

        this.emitter.on(getRouteMask(path, method), (req, res) => {
          if (handler) {
            handler(req, res);
          }
        });
      });
    });
  }

  public use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  private createServer() {
    const server = http.createServer((req, res) => {
      const routeMask = getRouteMask(req.url, req.method);

      this.middlewares.forEach(
        (middleware) => middleware(req as RequestType, res as ServerResponseType),
      );

      req.on('end', () => {
        const emitted = this.emitter.emit(routeMask, req, res);

        if (!emitted) {
          res.end();
        }
      });
    });

    return server;
  }
}

export default Application;
