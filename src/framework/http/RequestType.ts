import { IncomingMessage } from 'http';

interface RequestType extends IncomingMessage {
  body: any;
  id: string;
}

export default RequestType;
