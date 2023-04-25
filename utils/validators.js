const { passwordPolicy, userRoles } = require("./constants")
const validator = require("validator")

function checkPasswordStrength(password) {
    return validator.isStrongPassword(password, {
        minLength: passwordPolicy.MIN_LENGTH,
        minUppercase: passwordPolicy.MIN_UPPERCASE,
        minNumbers: passwordPolicy.MIN_NUMBERS,
        minSymbols: passwordPolicy.MIN_SYMBOLS
    })
}
function doesRoleExist(role) {
    return Object.values(userRoles).includes(role)
}

module.exports = {
    passwordValidator: {
        checkPasswordStrength
    },
    userRolesValidator: {
        doesRoleExist
    }
}