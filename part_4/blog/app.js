const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const router = require('./controllers/blogs')

const app = express()

console.log('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

app.use(express.json())
app.use('/api/blogs', router)

module.exports = app