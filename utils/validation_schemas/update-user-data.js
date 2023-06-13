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
    department: validationRules.department
        .messages({
            "string.empty": errors.DEPARTMENT_NOT_PROVIDED,
            "department.notFound":  errors.DEPARTMENT_NOT_FOUND
        }),
    salary: validationRules.salary
        .greater(0)
        .messages({
            "number.empty": errors.SALARY_NOT_PROVIDED,
            "number.base": errors.SALARY_NOT_NUMBER,
            "number.greater": errors.SALARY_NOT_POSITIVE
        }),
    stack: validationRules.stack
        .min(1)
        .messages({
            "any.empty": errors.STACK_NOT_PROVIDED,
            "array.min": errors.STACK_NOT_PROVIDED
        })
})

module.exports = {
    updateUserDataSchema
}