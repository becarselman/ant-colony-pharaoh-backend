const express = require('express')
const { registerUser } = require("../controllers/register")
const { validateRegisterData } = require("../middleware/register")

var router = express.Router();

router.post('/', validateRegisterData, registerUser);

module.exports = router;