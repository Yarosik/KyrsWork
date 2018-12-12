const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const analiticRoutes = require('./routes/analitic')
const categoryRoutes = require('./routes/category')
const testDriveRoutes = require('./routes/testDrive')
const carsRoutes = require('./routes/cars')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDb connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize())   
require('./middleware/passport')(passport) 

app.use(require("morgan")('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require("cors")())

app.use('/api/auth', authRoutes)
app.use('/api/analitic', analiticRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/testDrive', testDriveRoutes)
app.use('/api/cars', carsRoutes)

module.exports = app;