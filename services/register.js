const userRepository = require("../repositories/user")
const bcrypt = require("bcrypt")
const errors = require("../configuration/errors")
const userRoles = require("../configuration/user-roles")
const passwordValidator = require("../validators/password")


async function registerUser(email, password, role) {
    if (!email) {
        throw new Error(errors.EMAIL_NOT_PROVIDED)
    }

    if (!password) {
        throw new Error(errors.PASSWORD_NOT_PROVIDED)
    }

    let user = await userRepository.getUserByEmail(email)

    if (user) {
        throw new Error(errors.EMAIL_TAKEN)
    }

    if (!passwordValidator.checkPasswordStrength(password)) {
        throw new Error(errors.PASSWORD_NOT_STRONG)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    if (!role) {
        role = userRoles.USER
    }

    user = await userRepository.createUser(email, hashedPassword, role)

    return {
        user: user
    }
}

module.exports = {
    registerUser
}