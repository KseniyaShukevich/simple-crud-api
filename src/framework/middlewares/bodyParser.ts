import RequestType from '../http/RequestType';

const bodyParser = (req: RequestType) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (body) {
      req.body = JSON.parse(body);
    }
  });
};

export default bodyParser;
