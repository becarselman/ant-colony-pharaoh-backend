const mongoose = require("./connection")
const User = require("./models/User")
const bcrypt = require("bcrypt")

const users = [
    {
        "email": "pharaohadmin1@gmail.com",
        "password": bcrypt.hashSync("PharaohPassword1", 10)
    },
    {
        "email": "pharaohadmin2@gmail.com",
        "password": bcrypt.hashSync("PharaohPassword2", 10)
    }
]

async function seed() {

    console.log("Attempting to seed...")

    const numOfDefaultUsersInDB = await User.count({
        email: {
            $in: [
                "pharaohadmin1@gmail.com",
                "pharaohadmin2@gmail.com"
            ]
        }
    })

    //don't seed users if they already exist in DB
    if (numOfDefaultUsersInDB == 0) {
        await User.insertMany(users)
    }

}

seed()
    .then(() => {
        console.log("Default users seeded successfully")
    })
    .catch(err => {
        console.log("Error occured whiled seeding: " + err.stack)
    })
    .finally(() => {
        mongoose.disconnect()
    })