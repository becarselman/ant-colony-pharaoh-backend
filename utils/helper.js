const jwt = require("jsonwebtoken");
const env = require("../configuration/env");

function generateToken(payload, expiresIn) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

module.exports = {
  generateToken,
};
