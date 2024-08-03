const express = require('express')
require("dotenv").config()
require('./src/db/connect')

const CityRouter = require('./src/router/City.Router')
const AdventureRouter = require('./src/router/Adventure.Router')
const AdventureDetailRouter = require('./src/router/AdventureDetail.Router')
const AuthRouter = require('./src/router/Auth.Router')

const {RequestPathAndMethodLoggerMiddleware} = require('./src/middleware/Logger.Middleware')

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

const server = express()

server.use(express.json())
server.use(RequestPathAndMethodLoggerMiddleware)
server.use('/auth',AuthRouter)
server.use('/cities',CityRouter)
server.use('/adventure',AdventureRouter)
server.use('/adventureDetail',AdventureDetailRouter)

server.use("*", (req, res) => {
    res.status(404).json({
        success : false,
        message : "API ENDPOINT not found"
    })
})

server.listen(PORT, () => {
    console.log(`Server started successfully in ${NODE_ENV} at PORT ${PORT}`)
})