const express = require('express')

const {
    CreateNewUserController
} = require('../controller/User.Controller')

const AuthRouter = express.Router()

AuthRouter.post('/signUp',CreateNewUserController)



module.exports = AuthRouter
