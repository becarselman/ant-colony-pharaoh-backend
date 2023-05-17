const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user');
const errors = require('../configuration/errors');
const env = require("../configuration/env")
const { verifyJwtToken } = require('../utils/helper');

async function resetPassword(token, newPassword) {
  const decodedToken = verifyJwtToken(token, env.JWT_SECRET);
  const user = await userRepository.getUserById(decodedToken.userId);

  if (!user) {
    throw new Error(errors.USER_NOT_FOUND);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await userRepository.updateUserPassword(user._id, hashedPassword);

  return "Password reset successful";
}

module.exports = {
  resetPassword,
};
