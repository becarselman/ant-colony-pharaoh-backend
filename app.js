const express = require('express')
const bodyParser = require('body-parser')
const sendMailRouter = require('./routes/sendemail')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use('/sendmail', sendMailRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, async () => {
  console.log(`Express application is running on http://localhost:${port}`)
})
