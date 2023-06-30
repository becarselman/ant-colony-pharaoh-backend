const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

function validateToken(token) {
  try {
    jwt.verify(token, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  validateToken,
};
