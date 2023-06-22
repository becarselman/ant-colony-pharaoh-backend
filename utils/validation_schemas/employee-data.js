const joi = require('joi');

const employeeValidationSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  department: joi
    .string()
    .valid('Management', 'Administration', 'Design', 'Development')
    .required(),
  monthlySalary: joi.number().required(),
  techStack: joi
    .string()
    .valid('Full Stack', 'Front End', 'Back End', 'N/A')
    .required(),
});

module.exports = {
  employeeValidationSchema,
};
