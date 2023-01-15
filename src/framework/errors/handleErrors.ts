import ServerResponseType from '../ServerResponseType';

const handleUncaughtException = (res: ServerResponseType) => {
  const hasUncaughtExceptioListener = process.listeners('uncaughtException').length > 0;

  if (!hasUncaughtExceptioListener) {
    process.on('uncaughtException', (err) => {
      console.log(err);
      (res as ServerResponseType).send(500, 'Ooops! Something wrong on the server side.');
    });
  }
};

export {
  handleUncaughtException,
};
