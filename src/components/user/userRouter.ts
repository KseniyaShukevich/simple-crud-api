import ServerResponseType from '../../framework/ServerResponseType';
import RequestType from '../../framework/RequestType';

import Router from '../../framework/Router';

const router = new Router();

const users = [
  { name: 'Name1' },
  { name: 'Name2' },
];

router.get('/users', (req: RequestType, res: ServerResponseType) => {
  res.send(200, users);
});

router.get('/users/:id', (req: RequestType, res: ServerResponseType) => {
  console.log('ID: ', req.id);
  res.send(200, users[0]);
});

router.post('/users', (req: RequestType, res: ServerResponseType) => {
  const user = req.body;

  users.push(user);
  res.send(200, user);
});

router.put('/users/:id', (req: RequestType, res: ServerResponseType) => {
  console.log('ID: ', req.id);
  res.send(200, { name: 'PUT' });
});

router.delete('/users/:id', (req: RequestType, res: ServerResponseType) => {
  console.log('ID: ', req.id);
  res.send(200, { name: 'DELETE' });
});

export default router;
