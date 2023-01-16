import EventEmitter from 'events';
import { validate } from 'uuid';

import ServerResponseType from '../http/ServerResponseType';
import RequestType from '../http/RequestType';
import { InvalidIdError, RouteNotMatchedError } from '../errors/ErrorType';
import { getRouteMask } from '../helpers';

const routeController = (emitter: EventEmitter) => (req: RequestType, res: ServerResponseType) => {
  req.on('end', () => {
    const routeMask = getRouteMask(req.url, req.method);
    const emitted = emitter.emit(routeMask, req, res);

    if (!emitted) {
      throw new RouteNotMatchedError();
    }

    if ((req as RequestType).id) {
      const isIdValid = validate((req as RequestType).id);

      if (!isIdValid) {
        throw new InvalidIdError();
      }
    }
  });
};

export default routeController;
