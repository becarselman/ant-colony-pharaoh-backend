const { projectDataSchema } = require("../utils/validation_schemas/projects-data");

const validateProjectData = async function(req, res, next) {
    try {
        await projectDataSchema.validateAsync(req.body);
        next();
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

module.exports = {
    validateProjectData
};
