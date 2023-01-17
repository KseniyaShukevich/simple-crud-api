import ServerResponseType from '../http/ServerResponseType';
import RequestType from '../http/RequestType';

const jsonParser = (_req: RequestType, res: ServerResponseType) => {
  res.send = (status: number, data?: any) => {
    res.writeHead(status, {
      'Content-type': 'application/json',
    });

    res.end(JSON.stringify(data));
  };
};

export default jsonParser;
