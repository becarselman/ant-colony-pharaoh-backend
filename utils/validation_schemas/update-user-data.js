const joi = require("joi")
const validationRules = require("./validation-rules")
const errors = require("../../configuration/errors")

const updateUserDataSchema = joi.object({
    email: validationRules.email
        .messages({
            "string.empty": errors.EMAIL_NOT_PROVIDED,
            "string.email": errors.EMAIL_INVALID_FORMAT
        }),
    name: validationRules.name
        .messages({
            "string.empty": errors.NAME_NOT_PROVIDED,
        }),
    surname: validationRules.surname
        .messages({
            "string.empty": errors.SURNAME_NOT_PROVIDED,
        }),
})

module.exports = {
    updateUserDataSchema
}