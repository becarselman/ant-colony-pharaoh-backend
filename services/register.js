const userRepository = require("../repositories/user")
const bcrypt = require("bcrypt")
const errors = require("../configuration/errors")
const passwordPolicy = require("../configuration/password-policy")
const validator = require("validator")

function checkPasswordStrength(password) {
    return validator.isStrongPassword(password, {
        minLength: passwordPolicy.MIN_LENGTH,
        minUppercase: passwordPolicy.MIN_UPPERCASE,
        minNumbers: passwordPolicy.MIN_NUMBERS,
        minSymbols: passwordPolicy.MIN_SYMBOLS
    })
}

async function registerUser(email, password) {
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

    if (!checkPasswordStrength(password)) {
        throw new Error(errors.PASSWORD_NOT_STRONG)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user = await userRepository.createUser(email, hashedPassword)

    return {
        user: user
    }
}

module.exports = {
    registerUser
}