function createError(name, statusCode) {
  return class extends Error {
    constructor(message = name) {
      super(message);
      this.statusCode = statusCode;
    }
  };
}

const BadRequestError = createError("Bad Request", 400);
const UnauthorizedError = createError("Unauthorized", 401);
const ForbiddenError = createError("Forbidden", 403);
const NotFoundError = createError("Not Found", 404);
const ConflictError = createError("Conflict", 409);

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
