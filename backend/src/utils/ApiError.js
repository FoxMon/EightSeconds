module.exports = class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  static badRequest(msg) {
    return new ApiError(msg, 400);
  }

  static internal(msg) {
    return new ApiError(msg, 500);
  }

  static expiredToken(msg) {
    return new ApiError(msg, 401);
  }

  // static unavailableToken(msg) {
  //   return new ApiError(msg, 401);
  // }

  static forbidden(msg) {
    return new ApiError(msg, 403);
  }
};
