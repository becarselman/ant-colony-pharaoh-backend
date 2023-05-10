const User = require("../db/models/User");
const jwt = require('jsonwebtoken');

async function getUserByEmail(email) {
  return User.findOne({email: email});
}

async function createUser(userData) {
  const { email, password, role } = { ...userData }

  return await User.create({email: email, password: password, role: role})
}

async function getUserById(userId) {
  return User.findById(userId);
}

async function updateUserPassword(userId, hashedPassword) {
  return User.findByIdAndUpdate(userId, { password: hashedPassword });
}

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  updateUserPassword
};
