import { validate } from 'uuid';

import RequestType from '../http/RequestType';
import { InvalidIdError } from './errors/ErrorType';

const uuidIdChecker = (req: RequestType) => {
  const { id } = req;

  req.on('end', () => {
    if (id) {
      const isIdValid = validate(id);

      if (!isIdValid) {
        throw new InvalidIdError();
      }
    }
  });
};

export default uuidIdChecker;
