const { registerDataSchema } = require("./../utils/validation_schemas/register-data")

const validateRegisterData = async function(req, res, next) {
    try {
        await registerDataSchema.validateAsync(req.body)

        next()
    }
    catch (err) {
        return res.status(422).json({
            error: err.message
        })
    }
}

module.exports = {
    validateRegisterData
}