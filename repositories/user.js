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
