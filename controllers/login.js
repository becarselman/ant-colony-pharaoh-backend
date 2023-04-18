const loginService = require("../services/login")


const loginUser = async (req, res) => {
    try {
        const { email, password } = { ...req.body }

        const { userId, token } = await loginService.loginUser(email, password)

        return res.status(200).json({
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