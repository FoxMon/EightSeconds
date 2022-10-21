const ApiError = require("../utils/ApiError");

module.exports = {
  async throwError500(req, res, next) {
    try {
      throw ApiError.internal("에러가 발생했습니다 : status 500");
    } catch (err) {
      next(err);
    }
  },
};

