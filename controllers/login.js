const loginService = require("../services/login")


const loginUser = async (req, res) => {
    try {
        const { userId, token, name, surname } = await loginService.loginUser(req.body)

        return res.status(200).json({
            userId: userId,
            token: token,
            name, 
            surname
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