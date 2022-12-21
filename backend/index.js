const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()

const { success, error } = require('consola')

app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080'],
  })
)
app.use(express.json())
const PORT = 8200

// database Connection
mongoose.set('strictQuery', true)
mongoose
  .connect('mongodb://localhost:27017/node-auths', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected Database'))
  .catch((e) => console.log(e))

//Routes
const routes = require('../backend/routes/routes')

app.use('/api', routes)

app.listen(PORT, () =>
  success({ message: `Server started on PORT ${PORT}`, badge: true })
)
