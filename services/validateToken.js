const { verifyJwtToken } = require("../utils/helper");
const env = require("../configuration/env");

function validateToken(token) {
  try {
    return verifyJwtToken(token, env.JWT_SECRET);
  } catch (error) {
    return false;
  }
}

module.exports = {
  validateToken,
};
