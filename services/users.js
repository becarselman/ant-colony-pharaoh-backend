const userRepository = require("./../repositories/user")

const getAllUsers = async () => {
    return await userRepository.getAllUsers()
}

module.exports = {
    getAllUsers
}