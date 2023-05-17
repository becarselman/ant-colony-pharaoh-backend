const jwt = require("jsonwebtoken");
const env = require("../configuration/env");
const errors = require('../configuration/errors');

const generateToken = (payload, expiresIn) => 
jwt.sign(payload, env.JWT_SECRET, { expiresIn });

const verifyJwtToken = (token, secret) =>
 jwt.verify(token, secret);

module.exports = {
  generateToken,
  verifyJwtToken,
};
