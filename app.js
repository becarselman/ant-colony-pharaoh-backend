const express = require('express')
const seeder = require("./db/seed")

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  console.log(`Express application is running on http://localhost:${port}`)

  console.log("Attempting to seed...")

  const seedResult = seeder()
  .then(() => {
    console.log("Default users seeded successfully")
  })
  .catch(err => {
    console.log("Error occured whiled seeding: " + err.stack)
  })
})
