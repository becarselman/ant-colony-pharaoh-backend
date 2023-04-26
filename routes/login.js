const express = require('express')
const { loginUser } = require("../controllers/login")
const { validateLoginData } = require("../middleware/login")

var router = express.Router();

router.post('/', validateLoginData, loginUser);

module.exports = router;