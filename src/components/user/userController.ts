import RequestType from '../../framework/RequestType';
import ServerResponseType from '../../framework/ServerResponseType';
import userRepository from './userRepository';

const getUsers = async (req: RequestType, res: ServerResponseType) => {
  const users = await userRepository.getAll();

  res.send(200, users);
};

const getUserById = async (req: RequestType, res: ServerResponseType) => {
  const user = await userRepository.findById(req.id);

  res.send(200, user);
};

const createUser = async (req: RequestType, res: ServerResponseType) => {
  const user = await userRepository.create(req.body);

  res.send(201, user);
};

const updateUser = async (req: RequestType, res: ServerResponseType) => {
  const user = await userRepository.update(req.id, req.body);

  res.send(200, user);
};

const deleteUser = async (req: RequestType, res: ServerResponseType) => {
  await userRepository.delete(req.id);

  res.send(204, 'DELETE');
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
