import RequestType from '../../framework/http/RequestType';
import ServerResponseType from '../../framework/http/ServerResponseType';
import userRepository from './userRepository';
import ResponseStatus from '../../framework/http/ResponseStatus';

const getUsers = async (req: RequestType, res: ServerResponseType) => {
  const users = await userRepository.getAll();

  res.send(ResponseStatus.OK, users);
};

const getUserById = async (req: RequestType, res: ServerResponseType) => {
  const user = await userRepository.findById(req.id);

  res.send(ResponseStatus.OK, user);
};

const createUser = async (req: RequestType, res: ServerResponseType) => {
  const user = await userRepository.create(req.body);

  res.send(ResponseStatus.CREATED, user);
};

const updateUser = async (req: RequestType, res: ServerResponseType) => {
  const user = await userRepository.update(req.id, req.body);

  res.send(ResponseStatus.OK, user);
};

const deleteUser = async (req: RequestType, res: ServerResponseType) => {
  await userRepository.delete(req.id);

  res.send(ResponseStatus.DELETED, 'DELETE');
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
