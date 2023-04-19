const User = require("../db/models/User")
const errors = require("../configuration/errors")


async function getUserByEmail(email) {
    if (!email) {
        throw new Error(errors.EMAIL_NOT_PROVIDED)
    }

    return await User.findOne({ email: email })
}

async function createUser(email, hashedPassword) {
    if (!email) {
        throw new Error(errors.EMAIL_NOT_PROVIDED)
    }

    if (!hashedPassword) {
        throw new Error(errors.PASSWORD_NOT_PROVIDED)
    }

    User.create({ email: email, password: hashedPassword })
        .then(user => {
            return user
        })
        .catch(err => {
            throw err
        })
}

module.exports = {
    getUserByEmail,
    createUser
}