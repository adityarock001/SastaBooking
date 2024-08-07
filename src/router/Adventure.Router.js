const express = require('express')
const {
    CreateNewAdventureController,
    GetAllAdventureController,
    UpdateAnAdventureController,
    DeleteAnAdventureController
} = require('../controller/Adventure.Controller')

const { AdminAuthorizationMiddleware } = require('../middleware/Authorization.Middleware')

const AdventureRouter = express.Router()

AdventureRouter.post('/add', AdminAuthorizationMiddleware, CreateNewAdventureController)
AdventureRouter.get('/all',GetAllAdventureController)
AdventureRouter.put('/update',UpdateAnAdventureController)
AdventureRouter.delete('/delete',DeleteAnAdventureController)


module.exports = AdventureRouter 