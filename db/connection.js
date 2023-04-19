const mongoose = require('mongoose');
const env = require("../configuration/env")



mongoose.connection.on('connected', function () {
    console.log('Mongoose successfully connected to DB');
});

mongoose.connection.on('error', function (err) {
    console.error('Mongoose error:', err.stack);
    process.exit(1);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected from DB');
});


function terminateApp() {
    mongoose.disconnect()
        .then(() => {
            console.log("App terminating! Mongoose connection to DB closed.")
            process.exit(0);
        })
        .catch(err => {
            console.log("App terminating! Mongoose connection to DB NOT closed: " + err.stack)
        })
}

process.on('SIGTERM', terminateApp);
process.on('SIGINT', terminateApp)

mongoose.connect(env.DB_CONNECTION_STRING)

module.exports = mongoose