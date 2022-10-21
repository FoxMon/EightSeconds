const express = require("express");
const { chatCtrl } = require("../controllers");
const jwtVerification = require("../middlewares/jwtVerification");

const router = express.Router();

router.get("/log/:roomId", jwtVerification, chatCtrl.showChatLog); // 모든 채팅 로그 조회

module.exports = router;
 