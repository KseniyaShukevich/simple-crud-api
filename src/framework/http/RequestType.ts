import { IncomingMessage } from 'http';

interface RequestType extends IncomingMessage {
  body: any;
  id: string | undefined;
}

export default RequestType;
