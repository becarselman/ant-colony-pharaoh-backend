const { loginDataSchema } = require("./../utils/validation_schemas/login-data")

const validateLoginData = async function(req, res, next) {
    try {
        await loginDataSchema.validateAsync(req.body)

        next()
    }
    catch (err) {
        return res.status(401).json({
            error: err.message
        })
    }
}

module.exports = {
    validateLoginData
}