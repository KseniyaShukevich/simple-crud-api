import ServerResponseType from '../http/ServerResponseType';
import RequestType from '../http/RequestType';

type Middleware = (req: RequestType, res: ServerResponseType) => void;

export default Middleware;
