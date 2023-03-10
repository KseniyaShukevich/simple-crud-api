const enum ResponseStatus {
  'OK' = 200,
  'CREATED' = 201,
  'DELETED' = 204,
  'BAD_REQUEST' = 400,
  'NOT_FOUND' = 404,
  'SERVER_ERROR' = 500,
}

export default ResponseStatus;
