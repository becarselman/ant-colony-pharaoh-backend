const joi = require("joi")
const validationRules = require("./validation-rules")
const errors = require("../../configuration/errors")

const loginDataSchema = joi.object({
    email: validationRules.email
        .required()
        .messages({
            "string.empty": errors.EMAIL_NOT_PROVIDED,
            "any.required": errors.EMAIL_NOT_PROVIDED,
            "string.email": errors.EMAIL_INVALID_FORMAT
        }),
    password: validationRules.password
        .required()
        .messages({
            "any.required": errors.PASSWORD_NOT_PROVIDED,
            "string.empty": errors.PASSWORD_NOT_PROVIDED
        }),
})

module.exports = {
    loginDataSchema
}