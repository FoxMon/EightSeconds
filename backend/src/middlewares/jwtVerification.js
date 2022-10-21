const jwt = require("jsonwebtoken");

const ApiError = require("../utils/ApiError");

module.exports = verifyJWT = (req, res, next) => {
  try {
    // 헤더에서 토큰 가져오기
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      next(ApiError.badRequest("토큰을 받지 못했습니다."));
    }

    const secret = process.env.JWT_SECRET_KEY;

    const decodedToken = jwt.verify(
      token,
      secret
    );

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(ApiError.expiredToken("유효기간이 만료된 토큰입니다."));
    }
    next(ApiError.forbidden("유효하지 않은 토큰입니다."));
  }
};
