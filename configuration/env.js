require("dotenv").config()
const values = process.env

module.exports = {
    PORT: values.PORT,
    FRONTEND_URL: values.FRONTEND_URL,
    DB_CONNECTION_STRING: values.DB_CONNECTION_STRING,
    JWT_SECRET: values.JWT_SECRET,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE === 'true',
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    BASE_URL: values.BASE_URL
}
