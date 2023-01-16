import RequestType from '../http/RequestType';
import ResponseStatus from '../http/ResponseStatus';
import ServerResponseType from '../http/ServerResponseType';
import {
  BadRequestError,
  InvalidIdError,
  NotFoundError,
  RouteNotMatchedError,
} from './ErrorType';
import ErrorMessages from './errorMessages';

const handleExceptionError = (req: RequestType, res: ServerResponseType) => {
  process.removeAllListeners();
  process.on('uncaughtException', (err) => {
    if (err instanceof InvalidIdError) {
      res.send(ResponseStatus.BAD_REQUEST, { message: ErrorMessages.INVALID_ID });

      return;
    }

    if (err instanceof BadRequestError) {
      const { validationErrors } = err;

      res.send(
        ResponseStatus.BAD_REQUEST,
        { message: ErrorMessages.INVALID_DATA, validationErrors },
      );

      return;
    }

    if (err instanceof NotFoundError) {
      const { message } = err;

      res.send(ResponseStatus.NOT_FOUND, { message });

      return;
    }

    if (err instanceof RouteNotMatchedError) {
      res.send(ResponseStatus.NOT_FOUND, { message: ErrorMessages.INVALID_ROUTE });

      return;
    }

    console.log(err);
    res.send(ResponseStatus.SERVER_ERROR, { message: ErrorMessages.SERVER_ERROR });
  });
};

export {
  handleExceptionError,
};
