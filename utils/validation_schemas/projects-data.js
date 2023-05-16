const joi = require("joi");
const validationRules = require("./validation-rules");
const errors = require("../../configuration/errors");

const projectDataSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": errors.PROJECT_NAME_NOT_PROVIDED,
        "string.required": errors.PROJECT_NAME_NOT_PROVIDED,
    }),
    description: joi.string().required().messages({
        "string.empty": errors.PROJECT_DESCRIPTION_NOT_PROVIDED,
        "any.required": errors.PROJECT_DESCRIPTION_NOT_PROVIDED,
    }),
    duration: joi.object({
        from: joi.date().required().messages({
            "date.base": errors.PROJECT_START_DATE_INVALID_FORMAT,
            "any.required": errors.PROJECT_START_DATE_NOT_PROVIDED,
        }),
        to: joi.date().required().messages({
            "date.base": errors.PROJECT_END_DATE_INVALID_FORMAT,
            "any.required": errors.PROJECT_END_DATE_NOT_PROVIDED,
        }),
    }),
    developers: joi.array()
        .items(
            joi.object({
                user: joi.string().required().messages({
                    "string.empty": errors.PROJECT_DEVELOPER_USER_ID_NOT_PROVIDED,
                    "any.required": errors.PROJECT_DEVELOPER_USER_ID_NOT_PROVIDED,
                }),
                fullTime: joi.boolean().required().messages({
                    "any.required": errors.PROJECT_DEVELOPER_FULL_TIME_NOT_PROVIDED,
                }),
            })
        )
        .required()
        .messages({
            "array.empty": errors.PROJECT_DEVELOPERS_NOT_PROVIDED,
            "any.required": errors.PROJECT_DEVELOPERS_NOT_PROVIDED,
        }),
    projectType: joi.string().valid("fixed", "on going").required().messages({
        "string.empty": errors.PROJECT_TYPE_NOT_PROVIDED,
        "any.required": errors.PROJECT_TYPE_NOT_PROVIDED,
        "any.only": errors.PROJECT_TYPE_INVALID,
    }),
    hourlyRate: joi.number().required().messages({
        "number.base": errors.PROJECT_HOURLY_RATE_INVALID_FORMAT,
        "any.required": errors.PROJECT_HOURLY_RATE_NOT_PROVIDED,
    }),
    projectValue: joi.number().required().messages({
        "number.base": errors.PROJECT_VALUE_INVALID_FORMAT,
        "any.required": errors.PROJECT_VALUE_NOT_PROVIDED,
    }),
    actualEndDate: joi.date().allow(null).messages({
        "date.base": errors.PROJECT_ACTUAL_END_DATE_INVALID_FORMAT,
    }),
    salesChannel: joi.string().messages({
        "string.empty": errors.PROJECT_SALES_CHANNEL_EMPTY,
    }),
    isFinished: joi.boolean(),
});

module.exports = {
    projectDataSchema,
};
