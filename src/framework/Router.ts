import ServerResponseType from './http/ServerResponseType';
import RequestType from './http/RequestType';
import RequestMethods from './http/RequestMethods';
import EndpointsType from './EndpointType';

class Router {
  endpoints: EndpointsType;

  constructor() {
    this.endpoints = {};
  }

  request(
    method: RequestMethods,
    path: string,
    handler: (req: RequestType, res: ServerResponseType) => void,
  ) {
    const currentEndpoint = this.endpoints[path];

    if (!currentEndpoint) {
      this.endpoints[path] = {};
    }

    const currentMethod = this.endpoints[path][method];

    if (currentMethod) {
      throw new Error(`Method ${method} already exists in path ${path}`);
    }

    this.endpoints[path][method] = handler;
  }

  get(path: string, handler: (req: RequestType, res: ServerResponseType) => void) {
    this.request(RequestMethods.GET, path, handler);
  }

  post(path: string, handler: (req: RequestType, res: ServerResponseType) => void) {
    this.request(RequestMethods.POST, path, handler);
  }

  put(path: string, handler: (req: RequestType, res: ServerResponseType) => void) {
    this.request(RequestMethods.PUT, path, handler);
  }

  delete(path: string, handler: (req: RequestType, res: ServerResponseType) => void) {
    this.request(RequestMethods.DELETE, path, handler);
  }
}

export default Router;
