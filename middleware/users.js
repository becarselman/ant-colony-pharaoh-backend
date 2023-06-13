const errors = require("../configuration/errors");
const { updateUserDataSchema } = require("./../utils/validation_schemas/update-user-data")

const validatePageAndPageSize = async function (req, res, next) {

    if (!req.query.page) {
        req.query.page = 1
    }

    if (req.query.page < 1) {
        return res.status(400).json({
            error: errors.PAGE_NUMBER_LESS_THAN_1
        })
    }

    if (!req.query.size) {
        return res.status(422).json({
            error: errors.PAGE_SIZE_NOT_PROVIDED
        })
    }

    if (req.query.size < 1) {
        return res.status(400).json({
            error: errors.PAGE_SIZE_LESS_THAN_0
        })
    }

    await next()
}

const validateId = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(422).json({
            error: errors.ID_NOT_PROVIDED
        })
    }

    await next()
}

const validateUpdateUserData = async function(req, res, next) {
    try {
        await updateUserDataSchema.validateAsync(req.body)

        await next()
    }
    catch (err) {
        return res.status(403).json({
            error: err.message
        })
    }
}

module.exports = {
    validatePageAndPageSize,
    validateId,
    validateUpdateUserData
}