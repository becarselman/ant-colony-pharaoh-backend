const express = require("express");
const sendMailController = require("../controllers/sendemail");

const router = express.Router();

router.post("/", sendMailController.sendEmail);
router.post("/forgot-password", sendMailController.sendForgotPasswordEmail);
router.get("/reset-password/:token", sendMailController.getResetPassword);

module.exports = router;

