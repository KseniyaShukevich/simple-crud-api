import http, { Server } from 'http';
import EventEmitter from 'events';

import Router from './Router';
import { getRouteMask } from './helpers';
import RequestMethods from './requestMethods';
import Middleware from './middlewares/middlewareType';
import RequestType from './RequestType';
import ServerResponseType from './ServerResponseType';
import { EndpointType } from './endpointType';
import { handleUncaughtException } from './errors/handleErrors';

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
    this.server?.listen(port, callback);
  }

  public use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  public addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      Object.keys(endpoint).forEach((method) => {
        this.addEmitterForMethod(endpoint, path, method as RequestMethods);
      });
    });
  }

  private addEmitterForMethod(endpoint: EndpointType, path: string, method: RequestMethods) {
    const events = this.emitter.eventNames();
    const routeMask = getRouteMask(path, method);

    if (!events.includes(routeMask)) {
      const handler = endpoint[method as RequestMethods];

      this.emitter.on(routeMask, (req, res) => {
        if (handler) {
          handler(req, res);
        }
      });
    }
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
          (res as ServerResponseType).send(404, "This router doesn't exist.");
        }
      });

      handleUncaughtException(res as ServerResponseType);
    });

    return server;
  }
}

export default Application;
