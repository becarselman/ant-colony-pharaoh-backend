const usersService = require('../services/users')

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers(req.query.page, req.query.size)

        return res.status(200).json({
            users
        })
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params.id)

        return res.status(200).json({
            user
        })
    }
    catch (err) {
        return res.status(err.data.responseCode).json({
            error: err.message
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById
}