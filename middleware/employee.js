const { employeeValidationSchema } = require('../utils/validation_schemas/employee-data');

exports.validateEmployeeData = (req, res, next) => {
  const { error } = employeeValidationSchema.validate(req.body, { allowUnknown: true }); 
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
