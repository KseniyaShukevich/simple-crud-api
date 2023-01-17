import ServerResponseType from './http/ServerResponseType';
import RequestType from './http/RequestType';
import RequestMethods from './http/RequestMethods';

type HandlerEndpointType = (req: RequestType, res: ServerResponseType) => void;

interface EndpointType {
  [RequestMethods.GET]?: HandlerEndpointType;
  [RequestMethods.POST]?: HandlerEndpointType;
  [RequestMethods.PUT]?: HandlerEndpointType;
  [RequestMethods.DELETE]?: HandlerEndpointType;
}

interface EndpointsType {
  [key: string]: EndpointType;
}

export default EndpointsType;

export {
  EndpointType,
};
