const mongoose = require("./connection")
const User = require("./models/User")(mongoose)
const bcrypt = require("bcrypt")

const users = [
    {
        "email": "elvirvlahovljak@gmail.com",
        "password": bcrypt.hashSync("Pass123", 10)
    },
    {
        "email": "pharaohadmin@gmail.com",
        "password": bcrypt.hashSync("PharaohPass123", 10)
    }
]

const seedUsers = async () => {
    const numOfDefaultUsersInDB = await User.count({
        email: {
            $in: [
                "elvirvlahovljak@gmail.com",
                "pharaohadmin@gmail.com"
            ]
        }
    })
    
    //don't seed users if they already exist in DB
    if (numOfDefaultUsersInDB == 0) {
        await User.insertMany(users)
    }
}


module.exports = seedUsers