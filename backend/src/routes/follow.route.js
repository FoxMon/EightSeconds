const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const { followCtrl } = require("../controllers");

const router = express.Router();

router.get("/list/:userId", jwtVerification, followCtrl.showFollowList); // 팔로우 리스트 조회
router.get("/:targetId", jwtVerification, followCtrl.checkFollow); // 팔로우 유무 체크
router.post("/", jwtVerification, followCtrl.addFollow); // 팔로우 추가
router.delete("/", jwtVerification, followCtrl.removeFollow); // 팔로우 삭제

module.exports = router;