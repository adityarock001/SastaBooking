const express = require('express')
const {
    CreateNewAdventureDetailController
} = require('../controller/AdventureDetail.Controller')

const AdventureDetailRouter = express.Router()

AdventureDetailRouter.post('/add',CreateNewAdventureDetailController)
// AdventureRouter.get('/all',GetAllAdventureController)
// AdventureRouter.put('/update',UpdateAnAdventureController)
// AdventureRouter.delete('/delete',DeleteAnAdventureController)


module.exports = AdventureDetailRouter 