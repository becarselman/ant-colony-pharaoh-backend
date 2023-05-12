const jwt = require("jsonwebtoken");
const env = require("../configuration/env");
const errors = require('../configuration/errors');

function generateToken(payload, expiresIn) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

function verifyJwtToken(token, secret) {
  return jwt.verify(token, secret);
}



module.exports = {
  generateToken,
  verifyJwtToken,
};
