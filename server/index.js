const express = require('express');
require('dotenv').config()

const cors = require('cors');
const dbconnect = require('./config/dbconnect');
const initRoutes  = require('./routes')

const app = express()

// app.use('/', (req, res) => {
//   res.send('Hello world')
// })
app.use(cors({
  origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

initRoutes(app)

dbconnect()

const PORT = process.env.PORT || 6868

app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT)
})
