import Router from '../../framework/Router';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './userController';

const router = new Router();

router.get('/api/users', getUsers);
router.get('/api/users/:id', getUserById);
router.post('/api/users', createUser);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);

export default router;
