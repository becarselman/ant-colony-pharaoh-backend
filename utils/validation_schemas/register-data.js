const joi = require("joi")
const validationRules = require("./validation-rules")
const errors = require("../../configuration/errors")

const registerDataSchema = joi.object({
    email: validationRules.email
        .required()
        .messages({
            "string.empty": errors.EMAIL_NOT_PROVIDED,
            "any.required": errors.EMAIL_NOT_PROVIDED,
            "string.email": errors.EMAIL_INVALID_FORMAT
        }),
    name: validationRules.name
        .required()
        .messages({
            "string.empty": errors.NAME_NOT_PROVIDED,
            "any.required": errors.NAME_NOT_PROVIDED
        }),
    surname: validationRules.surname
        .required()
        .messages({
            "string.empty": errors.SURNAME_NOT_PROVIDED,
            "any.required": errors.SURNAME_NOT_PROVIDED
        }),
    password: validationRules.password
        .required()
        .messages({
            "any.required": errors.PASSWORD_NOT_PROVIDED,
            "string.empty": errors.PASSWORD_NOT_PROVIDED
        }),
    role: validationRules.role
        .messages({
            "role.notFound": errors.USER_ROLE_NOT_FOUND
        })
})

module.exports = {
    registerDataSchema
}