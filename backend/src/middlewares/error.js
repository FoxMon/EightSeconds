const ApiError = require("../utils/ApiError");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: err.message,
    _message: "필터링 되지 않은 에러입니다.",
  });
};
