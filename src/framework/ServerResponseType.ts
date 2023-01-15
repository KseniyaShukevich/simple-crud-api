import { ServerResponse } from 'http';

interface ServerResponseType extends ServerResponse {
  send: (status: number, data: any) => void;
}

export default ServerResponseType;
