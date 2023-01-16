import RequestType from '../../http/RequestType';
import ResponseStatus from '../../http/ResponseStatus';
import ServerResponseType from '../../http/ServerResponseType';
import { BadRequestError, NotFoundError, RouteNotMatchedError } from './ErrorType';

const handleExceptionError = (req: RequestType, res: ServerResponseType) => {
  process.removeAllListeners();
  process.on('uncaughtException', (err) => {
    console.log(err);

    if (err instanceof BadRequestError) {
      res.send(ResponseStatus.BAD_REQUEST, { message: 'Invalid data.' });

      return;
    }

    if (err instanceof NotFoundError) {
      res.send(ResponseStatus.NOT_FOUND, { message: 'Not found.' });

      return;
    }

    if (err instanceof RouteNotMatchedError) {
      res.send(ResponseStatus.NOT_FOUND, { message: "This route doesn't exist." });

      return;
    }

    res.send(ResponseStatus.SERVER_ERROR, { message: 'Ooops! Something wrong on the server side.' });
  });
};

export {
  handleExceptionError,
};
