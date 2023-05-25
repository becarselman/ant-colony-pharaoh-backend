const User = require("../db/models/User");

async function getUserByEmail(email) {
  return User.findOne({email: email});
}

async function createUser(userData) {
  return await User.create(userData)
}

async function getAllUsers(page, pageSize) {
  return await User
      .find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec()
}

async function getUserById(userId) {
  return await User.findById(userId).exec()
}

async function updateUserPassword(userId, hashedPassword) {
  return User.findByIdAndUpdate(userId, { password: hashedPassword });
}

module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
  getUserById,
  updateUserPassword
};
