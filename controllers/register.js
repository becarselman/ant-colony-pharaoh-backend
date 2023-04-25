const registerService = require("../services/register")


const registerUser = async (req, res) => {
    try {
        await registerService.registerUser(req.body)

        return res.status(200).json({
            message: "Registration successful"
        })
    }
    catch (err) {
        return res.status(422).json({
            error: err.message
        })
    }
}

module.exports = {
    registerUser
}