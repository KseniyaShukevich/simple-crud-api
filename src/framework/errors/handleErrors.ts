import ServerResponseType from '../ServerResponseType';

const handleUncaughtException = (res: ServerResponseType) => {
  process.on('uncaughtException', () => {
    (res as ServerResponseType).send(500, 'Ooops! Something wrong on the server side.');
  });
};

export {
  handleUncaughtException,
};
