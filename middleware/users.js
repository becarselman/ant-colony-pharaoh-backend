const errors = require("../configuration/errors");
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
        req.query.size = 0
    }

    //if page size is zero, mongoose will get entire collection
    if (req.query.size < 0) {
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

module.exports = {
    validatePageAndPageSize,
    validateId
}