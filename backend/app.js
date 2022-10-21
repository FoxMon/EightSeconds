// 패키지
const express = require("express");
const dotenv = require("dotenv");

// 미들웨어, 설정 모듈
const errorMiddleware = require("./src/middlewares/error");
const { swaggerUI, specs } = require("./src/config/swagger");
const cors = require("cors");
const dbConnect = require("./src/config/mongoose");
const socket = require("./src/config/socket");

// 라우터 불러오기
const {
  authRouter,
  userRouter,
  channelRouter,
  dataRouter,
  followRouter,
  chatRouter,
  errorRouter,
} = require("./src/routes");
const jwtVerification = require('./src/middlewares/jwtVerification');

const app = express();
dotenv.config();

// DB 연결
dbConnect();

// 미들웨어 연결
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우터 연결
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/channels", channelRouter);
app.use("/api/data", dataRouter);
app.use("/api/follow", followRouter);
app.use("/api/chat", chatRouter);
app.use("/api/error", errorRouter);
app.get("/api/jwt", jwtVerification, (req, res, next) => {
  res.send('성공');
})

// swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// 에러처리 미들웨어
app.use(errorMiddleware);

// 서버 시작
const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`${process.env.BASE_URL}${process.env.PORT || 3001}`);
});

socket(server);
