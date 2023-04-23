const registerService = require("../services/register")
const loginService = require("../services/login")


const registerUser = async (req, res) => {
    const { email, password, role } = { ...req.body }

    try {
        await registerService.registerUser(email, password, role)
    }
    catch (err) {
        return res.status(422).json({
            error: err.message
        })
    }

    //login user after registration
    try {
        const { userId, token } = await loginService.loginUser(email, password)

        return res.status(200).json({
            userId: userId,
            token: token
        })
    }
    catch(err) {
        return res.status(401).json({
            error: err.message
        })
    }
}

module.exports = {
    registerUser
}