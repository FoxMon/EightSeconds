const express = require("express");
const router = express.Router();
const { dataCtrl } = require("../controllers");

router.get("/:dataName", dataCtrl.loadData); // 분석한 데이터 불러오기

module.exports = router;
