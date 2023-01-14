import RequestMethods from './requestMethods';
import Endpoint from './endpointType';

class Router {
  endpoints: Endpoint;

  constructor() {
    this.endpoints = {};
  }

  request(method: string, path: string, handler: () => void) {
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

  get(path, handler) {
    this.request(RequestMethods.GET, path, handler);
  }

  post(path, handler) {
    this.request(RequestMethods.POST, path, handler);
  }

  put(path, handler) {
    this.request(RequestMethods.PUT, path, handler);
  }

  delete(path, handler) {
    this.request(RequestMethods.DELETE, path, handler);
  }
}

export default Router;
