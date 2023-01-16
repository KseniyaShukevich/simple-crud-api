import RequestType from '../../framework/http/RequestType';
import ServerResponseType from '../../framework/http/ServerResponseType';
import userRepository from './userRepository';
import ResponseStatus from '../../framework/http/ResponseStatus';
import getValidationUserMessages from './userValidator';
import { BadRequestError, NotFoundError } from '../../framework/errors/ErrorType';
import ErrorMessages from '../../framework/errors/ErrorMessages';

const getUsers = async (req: RequestType, res: ServerResponseType) => {
  const users = await userRepository.getAll();

  res.send(ResponseStatus.OK, users);
};

const getUserById = async (req: RequestType, res: ServerResponseType) => {
  const user = await userRepository.findById(req.id);

  if (!user) {
    throw new NotFoundError(ErrorMessages.NOT_FOUND_USER);
  }

  res.send(ResponseStatus.OK, user);
};

const createUser = async (req: RequestType, res: ServerResponseType) => {
  const validationMessages = getValidationUserMessages(req.body);
  const hasValidationMessages = validationMessages.length !== 0;

  if (hasValidationMessages) {
    throw new BadRequestError(validationMessages);
  }

  const user = await userRepository.create(req.body);

  res.send(ResponseStatus.CREATED, user);
};

const updateUser = async (req: RequestType, res: ServerResponseType) => {
  const validationMessages = getValidationUserMessages(req.body);
  const hasValidationMessages = validationMessages.length !== 0;

  if (hasValidationMessages) {
    throw new BadRequestError(validationMessages);
  }

  const user = await userRepository.update(req.id, req.body);

  if (!user) {
    throw new NotFoundError(ErrorMessages.NOT_FOUND_USER);
  }

  res.send(ResponseStatus.OK, user);
};

const deleteUser = async (req: RequestType, res: ServerResponseType) => {
  const user = await userRepository.delete(req.id);

  if (!user) {
    throw new NotFoundError(ErrorMessages.NOT_FOUND_USER);
  }

  res.send(ResponseStatus.DELETED);
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
