import dotenv from 'dotenv';

import Application from './framework/Application';
import userRouter from './components/user/userRouter';
import jsonParser from './framework/middlewares/jsonParser';
import bodyParser from './framework/middlewares/bodyParser';
import urlParser from './framework/middlewares/urlParser';
import { handleExceptionError } from './framework/errors/handleErrors';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = new Application();

app.use(jsonParser);
app.use(bodyParser);
app.use(urlParser);
app.use(handleExceptionError);

app.addRouter(userRouter);

app.listen(Number(PORT), () => {
  console.log(`Server started on PORT ${PORT}`);
});

export default app;
