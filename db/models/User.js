const mongoose = require("../connection")
const validator = require("validator")

//password will be hashed with bcrypt
//so there is no need for password validation here

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Email in invalid format"]
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', UserSchema)