const mongoose = require("../connection")
const validator = require("validator")
const errors = require("../../configuration/errors")
const rolesValidator = require("../../validators/roles")

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
    },
    role: {
        type: String,
        required: true,
        validate: [rolesValidator.doesRoleExist, errors.USER_ROLE_NOT_FOUND]
    }
});

module.exports = mongoose.model('Users', UserSchema)
