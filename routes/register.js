const express = require('express')
const { registerUser } = require("../controllers/register")

var router = express.Router();

router.post('/', registerUser);

module.exports = router;