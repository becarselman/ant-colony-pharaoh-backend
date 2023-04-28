const express = require('express')
const cors = require("cors")
const env = require("./configuration/env")
const loginRoutes = require("./routes/login")
const registerRoutes = require("./routes/register")
const {FRONTEND_URL} = require("./configuration/env");

const app = express()
const port = env.PORT

app.use(express.json())
app.use(cors({
  origin: FRONTEND_URL
}))

app.use("/login", loginRoutes)
app.use("/register", registerRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  console.log(`Express application is running on http://localhost:${port}`)
})
