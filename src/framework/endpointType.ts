import ServerResponseType from './ServerResponseType';
import RequestType from './RequestType';
import RequestMethods from './requestMethods';

interface ObjectKey {
  [RequestMethods.GET]?: (req: RequestType, res: ServerResponseType) => void;
  [RequestMethods.POST]?: (req: RequestType, res: ServerResponseType) => void;
  [RequestMethods.PUT]?: (req: RequestType, res: ServerResponseType) => void;
  [RequestMethods.DELETE]?: (req: RequestType, res: ServerResponseType) => void;
}

interface Endpoint {
  [key: string]: ObjectKey;
}

export default Endpoint;
