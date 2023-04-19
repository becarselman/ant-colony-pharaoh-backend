const express = require('express')
const loginRoutes = require("./routes/login")

const app = express()
const port = 3000

app.use(express.json())

app.use("/login", loginRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  console.log(`Express application is running on http://localhost:${port}`)
})
