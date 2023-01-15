import ServerResponseType from './ServerResponseType';
import RequestType from './RequestType';
import RequestMethods from './requestMethods';

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
