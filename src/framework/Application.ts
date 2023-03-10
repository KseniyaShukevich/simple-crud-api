import http, { Server } from 'http';
import EventEmitter from 'events';
import { validate } from 'uuid';

import Router from './Router';
import { getRouteMask } from './helpers';
import RequestMethods from './http/RequestMethods';
import Middleware from './middlewares/middlewareType';
import RequestType from './http/RequestType';
import ServerResponseType from './http/ServerResponseType';
import { EndpointType } from './EndpointType';
import { InvalidIdError, RouteNotMatchedError } from './errors/ErrorType';

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

      if (endpoint) {
        Object.keys(endpoint).forEach((method) => {
          this.addEmitterForMethod(endpoint, path, method as RequestMethods);
        });
      }
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

  private addRouteController(req: RequestType, res: ServerResponseType) {
    req.on('end', () => {
      const routeMask = getRouteMask(req.url, req.method);
      const emitted = this.emitter.emit(routeMask, req, res);

      if (!emitted) {
        throw new RouteNotMatchedError();
      }

      if (req.id) {
        const isIdValid = validate(req.id);

        if (!isIdValid) {
          throw new InvalidIdError();
        }
      }
    });
  }

  public close() {
    this.server.close();
  }

  private createServer() {
    const server = http.createServer((req, res) => {
      this.middlewares.forEach(
        (middleware) => middleware(req as RequestType, res as ServerResponseType),
      );

      this.addRouteController(req as RequestType, res as ServerResponseType);
    });

    return server;
  }
}

export default Application;
