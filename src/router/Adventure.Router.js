const express = require('express')
const {
    CreateNewAdventureController,
    GetAllAdventureController,
    UpdateAnAdventureController,
    DeleteAnAdventureController
} = require('../controller/Adventure.Controller')

const AdventureRouter = express.Router()

AdventureRouter.post('/add',CreateNewAdventureController)
AdventureRouter.get('/all',GetAllAdventureController)
AdventureRouter.put('/update',UpdateAnAdventureController)
AdventureRouter.delete('/delete',DeleteAnAdventureController)


module.exports = AdventureRouter 