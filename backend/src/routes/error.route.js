const express = require("express");
const { errorCtrl } = require("../controllers");

const router = express.Router();

router.get("/", errorCtrl.throwError500);

module.exports = router;
