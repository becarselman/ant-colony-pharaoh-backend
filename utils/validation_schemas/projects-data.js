const joi = require("joi");

const projectDataSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    duration: joi.object({
        from: joi.date().required(),
        to: joi.date().required(),
    }),
    developers: joi.array()
        .items(
            joi.object({
                user: joi.string().required(),
                fullTime: joi.boolean().required(),
            })
        )
        .required(),
    projectType: joi.string().valid("fixed", "on going").required(),
    hourlyRate: joi.number().required(),
    projectValue: joi.number().required(),
    actualEndDate: joi.date().allow(null),
    salesChannel: joi.string(),
    isFinished: joi.boolean(),
    projectStatus: joi.string().required(),
});

module.exports = {
    projectDataSchema,
};
