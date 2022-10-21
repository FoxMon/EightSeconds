const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const upload = require("../middlewares/upload");
const { channelCtrl } = require("../controllers");

const router = express.Router();

router.post("/", jwtVerification, upload.single("image"), channelCtrl.makeChannel); // 채널 생성
router.get("/", channelCtrl.showChannelList); // 채널 목록 반환(모집 중, 모집 완료, 활동 종료)
router.get("/search", channelCtrl.searchChannelList); // 채널 검색
router.get("/:channelId", jwtVerification, channelCtrl.showChannelInfo); // 채널 정보 확인
router.put("/:channelId", jwtVerification, upload.single("image"), channelCtrl.changeChannelInfo); // 채널 정보 변경
router.put("/:channelId/enter", jwtVerification, channelCtrl.requestChannelEnter); // 채널 입장 신청
router.delete("/:channelId/enter", jwtVerification, channelCtrl.cancelChannelEnter); // 채널 입장 신청 취소
router.get("/:channelId/waiting", jwtVerification, channelCtrl.showWaitList); // 채널 입장 신청 확인
router.put("/:channelId/waiting", jwtVerification, channelCtrl.acceptChannelEnter); // 채널 입장 신청 수락
router.delete("/:channelId/waiting", jwtVerification, channelCtrl.rejectChannelEnter); // 채널 입장 신청 거절
router.get("/:channelId/main", jwtVerification, channelCtrl.loadMainContent); // 채널 메인 페이지
router.delete("/:channelId/leave", jwtVerification, channelCtrl.leaveChannel); // 채널 떠나기
router.delete("/:channelId/delete", jwtVerification, channelCtrl.deleteChannel); // 채널 삭제하기

module.exports = router