import RequestType from '../http/RequestType';

const urlParser = (req: RequestType) => {
  const parsedUrl = req.url?.split('/');
  const idIndex = 2;

  if (parsedUrl) {
    const id = parsedUrl[idIndex];

    req.id = id;
  }
};

export default urlParser;
