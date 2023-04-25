const userRepository = require("../repositories/user")
const errors = require("../configuration/errors")
const { userRoles } = require("../utils/constants")
const { passwordValidator } = require("../utils/validators")


async function registerUser(registerData) {
    const { email, password, role } = { ...registerData }

    if (!email) {
        throw new Error(errors.EMAIL_NOT_PROVIDED)
    }

    if (!password) {
        throw new Error(errors.PASSWORD_NOT_PROVIDED)
    }

    if (!role) {
        registerData.role = userRoles.USER
    }

    let user = await userRepository.getUserByEmail(email)

    if (user) {
        throw new Error(errors.EMAIL_TAKEN)
    }

    if (!passwordValidator.checkPasswordStrength(password)) {
        throw new Error(errors.PASSWORD_NOT_STRONG)
    }

    user = await userRepository.createUser(registerData)

    return {
        user: user
    }
}

module.exports = {
    registerUser
}