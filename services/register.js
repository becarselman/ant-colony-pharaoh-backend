const userRepository = require("../repositories/user")
const errors = require("../configuration/errors")
const { userRoles } = require("../utils/constants")


async function registerUser(registerData) {
    const { email, role } = { ...registerData }

    if (!role) {
        registerData.role = userRoles.USER
    }

    let user = await userRepository.getUserByEmail(email)

    if (user) {
        throw new Error(errors.EMAIL_TAKEN)
    }

    try {
        user = await userRepository.createUser(registerData)
        
        return {
            user: user
        }
    }
    catch (err) {
        throw err
    }
}

module.exports = {
    registerUser
}