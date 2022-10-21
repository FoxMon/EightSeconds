// 몽고디비 커넥션 이벤트
// 특별한 일 없으면 수정하지 않기

const mongoose = require("mongoose");

const connectionEvent = () => {
  mongoose.connect(process.env.ATLAS_DB_URL); 
  mongoose.connection.on("connected", () => {
    console.log("DB 연결 성공");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("DB 연결 끊김");
  });
  mongoose.connection.on("error", (err) => {
    console.error("DB 연결 중 에러 발생", err);
  });
};

module.exports = connectionEvent; 
