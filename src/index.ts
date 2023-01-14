import dotenv from 'dotenv';
import { ServerResponse } from 'http';

import Application from './framework/Application';
import Router from './framework/Router';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = new Application();

const router = new Router();

router.get('/users', (req: any, res: ServerResponse) => {
  res.end('USERS');
});

router.get('/posts', (req: any, res: ServerResponse) => {
  res.end('POSTS');
});

app.addRouter(router);

app.listen(Number(PORT), () => {
  console.log(`Server started on PORT ${PORT}`);
});
