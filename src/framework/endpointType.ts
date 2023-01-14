import RequestMethods from './requestMethods';

interface ObjectKey {
  [RequestMethods.GET]?: () => void;
  [RequestMethods.POST]?: () => void;
  [RequestMethods.PUT]?: () => void;
  [RequestMethods.DELETE]?: () => void;
}

interface Endpoint {
  [key: string]: ObjectKey;
}

export default Endpoint;
