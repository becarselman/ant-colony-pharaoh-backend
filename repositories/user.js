const User = require("../db/models/User");

async function getUserByEmail(email) {
  return User.findOne({email: email});
}

async function createUser(userData) {
  const {
    email,
    name,
    surname,
    department,
    salary,
    stack,
    password,
    role
  } = { ...userData }

  return await User.create({email, name, surname, department, salary, stack, password, role})
}

async function getAllUsers() {
  return await User.find({}).exec()
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
