import { ServerResponse } from 'http';

import RequestMethods from './requestMethods';

interface ObjectKey {
  [RequestMethods.GET]?: (req: any, res: ServerResponse) => void;
  [RequestMethods.POST]?: (req: any, res: ServerResponse) => void;
  [RequestMethods.PUT]?: (req: any, res: ServerResponse) => void;
  [RequestMethods.DELETE]?: (req: any, res: ServerResponse) => void;
}

interface Endpoint {
  [key: string]: ObjectKey;
}

export default Endpoint;
