const dotenv  = require("dotenv").config()
const values = process.env

module.exports = {
    DB_CONNECTION_STRING: values.DB_CONNECTION_STRING,
    JWT_SECRET: values.JWT_SECRET
}
