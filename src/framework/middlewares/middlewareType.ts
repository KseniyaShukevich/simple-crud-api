import ServerResponseType from '../ServerResponseType';
import RequestType from '../RequestType';

type Middleware = (req: RequestType, res: ServerResponseType) => void;

export default Middleware;
