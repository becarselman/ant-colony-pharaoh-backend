const mongoose = require("../connection")
const validator = require("validator")
const errors = require("../../configuration/errors")

//password will be hashed with bcrypt
//so there is no need for password validation here

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, errors.EMAIL_INVALID_FORMAT]
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', UserSchema)
