const userRepository = require("../repositories/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const errors = require("../configuration/errors")
const env = require("../configuration/env")

async function loginUser(email, password) {
    const user = await userRepository.getUserByEmail(email)

    if (!user) {
        throw new Error(errors.EMAIL_NOT_FOUND)
    }

    if (!password) {
        throw new Error(errors.PASSWORD_NOT_PROVIDED)
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        throw new Error(errors.INCORRECT_PASSWORD)
    }

    return {
        userId: user._id,
        token: jwt.sign({ email: user.email }, env.JWT_SECRET, { expiresIn: "1d" })
    }
}

module.exports = {
    loginUser
}