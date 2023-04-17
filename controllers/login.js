const loginService = require("../services/login")


const loginUser = async (req, res) => {
    const { email, password } = { ...req.body }

    if (email === undefined) {
        return res.status(401).json({
            error: "Email not provided"
        })
    }

    if (password === undefined) {
        return res.status(401).json({
            error: "Password not provided"
        })
    }

    try {
        const user = await loginService.getUserByEmail(email)

        if (user === null) {
            return res.status(404).json({
                error: "Email not found"
            })
        }

        const validPassword = await loginService.checkPassword(user, password)

        if (!validPassword) {
            return res.status(401).json({
                error: "Password incorrect"
            })
        }

        const token = loginService.generateJWTToken(user)

        return res.json({
            token: token
        })
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
}

module.exports = {
    loginUser
}