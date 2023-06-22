const joi = require("joi")
const passwordComplexity = require("joi-password-complexity")
const { passwordPolicy, userRoles,  } = require("../constants")

module.exports = {
    email: joi
        .string()
        .email(),
    name: joi
        .string(),
    surname: joi
        .string(),
    password: passwordComplexity(passwordPolicy, "Password"),
    role: joi
        .string()
        .custom((value, helpers) => {
            if (!value) {
                return value
            }

            if (Object.values(userRoles).includes(value.toUpperCase())) {
                return value
            }
            else {
                return helpers.error("role.notFound")
            }
        })
}