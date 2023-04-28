require("dotenv").config()
const values = process.env

module.exports = {
    PORT: values.PORT,
    FRONTEND_URL: values.FRONTEND_URL,
    DB_CONNECTION_STRING: values.DB_CONNECTION_STRING,
    JWT_SECRET: values.JWT_SECRET
}
