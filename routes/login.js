const express = require('express')
const { loginUser } = require("../controllers/login")

var router = express.Router();

router.post('/', loginUser);

module.exports = router;