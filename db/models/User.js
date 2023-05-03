const mongoose = require("../connection")
const validator = require("validator")
const errors = require("../../configuration/errors")
const bcrypt = require("bcrypt")

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
        uppercase: true,
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpirationDate: {
        type: Date,
        default: null
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
