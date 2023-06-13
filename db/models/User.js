const mongoose = require("../connection")
const validator = require("validator")
const errors = require("../../configuration/errors")
const constants = require("../../utils/constants")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, errors.EMAIL_INVALID_FORMAT]
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        uppercase: true,
        enum: Object.values(constants.userRoles)
    }
});

UserSchema.pre("save",  function (next) {
    const user = this

    if (!user.isModified("password")) {
        return next
    }

    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash
            next()
        })
        .catch(err => {
            return next(err)
        })
})

UserSchema.methods.checkPassword = async function (password) {
    const user = this

    return await bcrypt.compare(password, user.password)
}

module.exports = mongoose.model('Users', UserSchema)
