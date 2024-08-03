const express = require('express')

const {
    CreateNewUserController,
    SignInUserController
} = require('../controller/User.Controller')

const AuthRouter = express.Router()

AuthRouter.post('/signUp',CreateNewUserController)
AuthRouter.post('/signIn',SignInUserController)



module.exports = AuthRouter
