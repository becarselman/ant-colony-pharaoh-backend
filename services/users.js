const userRepository = require("./../repositories/user")
const errors = require("../configuration/errors");
const { CustomError } = require("../utils/customError");

const getAllUsers = async (page, pageSize) => {
    return await userRepository.getAllUsers(page, pageSize)
}

const getUserById = async (id) => {

    let user

    try {
        user = await userRepository.getUserById(id)
    }
    catch(err) {
        throw new CustomError(errors.ID_WRONG_FORMAT, {
            responseCode: 422
        })
    }

    if (!user) {
        throw new CustomError(errors.USER_NOT_FOUND, {
            responseCode: 404
        })
    }

    return user
}

module.exports = {
    getAllUsers,
    getUserById
}