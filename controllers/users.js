const usersService = require('../services/users')

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers()

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

module.exports = {
    getAllUsers
}