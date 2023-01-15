import ServerResponseType from '../ServerResponseType';
import RequestType from '../RequestType';

const jsonParser = (req: RequestType, res: ServerResponseType) => {
  res.send = (status: number, data: any) => {
    res.writeHead(status, {
      'Content-type': 'application/json',
    });

    res.end(JSON.stringify(data));
  };
};

export default jsonParser;
