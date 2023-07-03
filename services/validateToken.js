const { verifyJwtToken } = require("../utils/helper");
const env = require("../configuration/env");

async function validateToken(token) {
  try {
    await verifyJwtToken(token, env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  validateToken,
};
