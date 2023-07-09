const joi = require("joi");

const projectDataSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    duration: joi.object({
      from: joi.date().required(),
      to: joi.date().required(),
    }),
    developers: joi
      .array()
      .items(
        joi.object({
          employee: joi.string(),
          fullTime: joi.boolean(),
        })
      )
      .min(1),
    projectType: joi.string().valid("fixed", "on going"),
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