import dotenv from 'dotenv';

import Application from './framework/Application';
import Router from './framework/Router';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = new Application();

const router = new Router();

router.get('/users', (req, res) => {
  res.end('USERS');
});

router.get('/posts', (req, res) => {
  res.end('POSTS');
});

app.addRouter(router);

app.listen(Number(PORT), () => {
  console.log(`Server started on PORT ${PORT}`);
});
