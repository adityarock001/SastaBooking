const express = require('express')
const {
    CreateNewAdventureDetailController
} = require('../controller/AdventureDetail.Controller')

const { AdminAuthorizationMiddleware } = require('../middleware/Authorization.Middleware')

const AdventureDetailRouter = express.Router()

AdventureDetailRouter.post('/add', AdminAuthorizationMiddleware, CreateNewAdventureDetailController)
// AdventureRouter.get('/all',GetAllAdventureController)
// AdventureRouter.put('/update',UpdateAnAdventureController)
// AdventureRouter.delete('/delete',DeleteAnAdventureController)


module.exports = AdventureDetailRouter 