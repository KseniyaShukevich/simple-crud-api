class BadRequestError extends Error {
  public validationErrors: Array<string>;

  constructor(validationErrors?: Array<string>) {
    super();
    this.validationErrors = validationErrors || [];
  }
}

class NotFoundError extends Error {}
class RouteNotMatchedError extends Error {}
class InvalidIdError extends Error {}

export {
  BadRequestError,
  NotFoundError,
  RouteNotMatchedError,
  InvalidIdError,
};
