const User = require("../db/models/User");
const jwt = require('jsonwebtoken');

async function getUserByEmail(email) {
  return User.findOne({email: email});
}

async function createUser(userData) {
  const { email, password, role } = { ...userData }

  return await User.create({email: email, password: password, role: role})
}


module.exports = {
  getUserByEmail,
  createUser,

};
