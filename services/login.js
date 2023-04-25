const userRepository = require("../repositories/user")
const jwt = require("jsonwebtoken")
const errors = require("../configuration/errors")
const env = require("../configuration/env")

async function loginUser(loginData) {
    const { email, password } = { ...loginData }

    if (!email) {
        throw new Error(errors.EMAIL_NOT_PROVIDED)
    }

    if (!password) {
        throw new Error(errors.PASSWORD_NOT_PROVIDED)
    }

    const user = await userRepository.getUserByEmail(email)

    if (!user) {
        throw new Error(errors.EMAIL_NOT_FOUND)
    }

    const validPassword = await user.checkPassword(password)

    if (!validPassword) {
        throw new Error(errors.INCORRECT_PASSWORD)
    }

    return {
        userId: user._id,
        token: jwt.sign({email: user.email}, env.JWT_SECRET, {expiresIn: "1d"})
    }
}

module.exports = {
    loginUser
}