const passwordPolicy = require("../configuration/password-policy")
const validator = require("validator")

function checkPasswordStrength(password) {
    if (!password) {
        throw new Error(errors.PASSWORD_NOT_PROVIDED)
    }

    return validator.isStrongPassword(password, {
        minLength: passwordPolicy.MIN_LENGTH,
        minUppercase: passwordPolicy.MIN_UPPERCASE,
        minNumbers: passwordPolicy.MIN_NUMBERS,
        minSymbols: passwordPolicy.MIN_SYMBOLS
    })
}

module.exports = {
    checkPasswordStrength
}