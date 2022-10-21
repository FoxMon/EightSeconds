const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");

const router = express.Router();

const { authCtrl } = require("../controllers");

router.post("/login", authCtrl.login);
router.post("/register", authCtrl.register);
router.delete("/withdrawal", jwtVerification, authCtrl.withdrawUser);
router.post("/email", authCtrl.sendEmailAuthCode);
router.delete("/email", authCtrl.checkEmailAuthCode);
router.post('/refresh', authCtrl.reissueToken);


module.exports = router; 