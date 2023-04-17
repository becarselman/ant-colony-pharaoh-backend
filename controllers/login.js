const loginService = require("../services/login")
const errors = require("../utils/errors")


const loginUser = async (req, res) => {
    try {
        const { email, password } = { ...req.body }

        const { userId, token } = await loginService.loginUser(email, password)

        return res.json({
            userId: userId,
            token: token
        })
    }
    catch (err) {
        return res.status(401).json({
            error: err.message
        })
    }
}

module.exports = {
    loginUser
}