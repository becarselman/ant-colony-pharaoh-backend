const mongoose = require("./connection")
const User = require("./models/User")
const bcrypt = require("bcrypt")

const users = [
    {
        "email": "mkasapovic@gmail.com",
        "name": "Meliha",
        "surname": "Kasapovic",
        "password": bcrypt.hashSync("MKasapovic1", 10),
        "role": "ADMIN"
    },
	{
        "email": "tvelic@gmail.com",
        "name": "Tarik",
        "surname": "Velic",
        "password": bcrypt.hashSync("TVelic1", 10),
        "role": "ADMIN"
    },
    {
        "email": "evlahovljak@gmail.com",
        "name": "Elvir",
        "surname": "Vlahovljak",
        "password": bcrypt.hashSync("EVlahovljak1", 10),
        "role": "ADMIN"
    },
]

async function seed() {

    console.log("Attempting to seed...")

    const numOfDefaultUsersInDB = await User.count({
        email: {
            $in: [
                "mkasapovic@gmail.com",
                "tvelic@gmail.com",
				"evlahovljak@gmail.com"
            ]
        }
    })

    //don't seed users if they already exist in DB
    if (numOfDefaultUsersInDB === 0) {
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