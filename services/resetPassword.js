const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user');
const errors = require('../configuration/errors');
const env = require("../configuration/env")

async function resetPassword(token, newPassword, confirmPassword) {
  const decodedToken = jwt.verify(token, env.JWT_SECRET);
  const user = await userRepository.getUserById(decodedToken.userId);

  if (!user) {
    throw new Error(errors.USER_NOT_FOUND);
  }
  if (newPassword !== confirmPassword) {
    throw new Error(errors.PASSWORDS_DO_NOT_MATCH);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await userRepository.updateUserPassword(user._id, hashedPassword);
}

module.exports = {
  resetPassword,
};
