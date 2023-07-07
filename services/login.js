const userRepository = require("../repositories/user")
const errors = require("../configuration/errors")
const { generateToken } = require("../utils/helper")

async function loginUser(loginData) {
    const { email, password } = { ...loginData }

    const user = await userRepository.getUserByEmail(email)

    if (!user) {
        throw new Error(errors.EMAIL_NOT_FOUND)
    }

    const validPassword = await user.checkPassword(password)

    if (!validPassword) {
        throw new Error(errors.INCORRECT_PASSWORD)
    }

    const token = generateToken({ email: user.email }, "1d");

    return {
        userId: user._id,
        token,
        name: user.name,
        surname: user.surname
    }
}

module.exports = {
    loginUser
}
