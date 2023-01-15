import Router from '../../framework/Router';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './userController';

const router = new Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
