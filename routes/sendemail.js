const express = require("express");
const sendMailController = require("../controllers/sendemail");

const router = express.Router();

router.post("/", sendMailController.sendEmail);
router.post("/forgot-password", sendMailController.sendForgotPasswordEmail);
router.post("/reset-password/:token", sendMailController.resetPassword);
router.post("/reset-password", sendMailController.resetPassword);



module.exports = router;

