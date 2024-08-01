const express = require('express')
const {
    CreateNewCityController,
    GetAllCityController,
    UpdateACityController,
    DeleteACityController
} = require('../controller/City.Controller')

const CityRouter = express.Router()

CityRouter.post('/add',CreateNewCityController)
CityRouter.get('/all',GetAllCityController)
CityRouter.put('/update',UpdateACityController)
CityRouter.delete('/delete',DeleteACityController)


module.exports = CityRouter