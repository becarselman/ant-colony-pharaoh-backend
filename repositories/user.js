const User = require("../db/models/User");
const jwt = require('jsonwebtoken');

async function getUserByEmail(email) {
  return User.findOne({email: email});
}

async function createUser(userData) {
  const { email, password, role } = { ...userData }

  return await User.create({email: email, password: password, role: role})
}

async function setResetPasswordToken(user) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  return token;
}

module.exports = {
  getUserByEmail,
  createUser,
  setResetPasswordToken
};
