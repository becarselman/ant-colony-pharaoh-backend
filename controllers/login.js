const loginService = require("../services/login")


const loginUser = async (req, res) => {
    try {
        const { userId, token } = await loginService.loginUser(req.body)

        return res.status(200).json({
            userId: userId,
            token: token
        })
    }
    catch (err) {
        return res.status(401).json({
            error: "Email or password incorrect"
        })
    }
}

module.exports = {
    loginUser
}