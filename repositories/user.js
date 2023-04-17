const User = require("../db/models/User")
const errors = require("../utils/errors")


async function getUserByEmail(email) {
    if (!email) {
        throw new Error(errors.EMAIL_NOT_PROVIDED)
    }

    return await User.findOne({ email: email })
}

module.exports = {
    getUserByEmail
}