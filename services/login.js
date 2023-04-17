const User = require("../db/models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv  = require("dotenv")

dotenv.config()

async function getUserByEmail(email) {
    if (email === undefined) {
        throw new Error("Email not provided")
    }

    return await User.findOne({ email: email })
}

async function checkPassword(user, password) {
    return await bcrypt.compare(password, user.password)
}

function generateJWTToken(user) {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

module.exports = {
    getUserByEmail,
    checkPassword,
    generateJWTToken
}