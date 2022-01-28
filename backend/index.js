const express = require('express')
const cors = require('cors')

//express
const app = express()

//json response
app.use(express.json())

//solve cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

//folder  for image (public)
app.use(express.static('public'))

//routes

//rota user e thg
const UserRoutes = require('./routes/UserRoutes')
const ThgRoutes = require('./routes/ThgRoutes')

app.use('/users', UserRoutes)
app.use('/thgs', ThgRoutes)


app.listen(5000)
