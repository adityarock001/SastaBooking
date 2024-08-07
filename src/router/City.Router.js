const express = require('express')
const {
    CreateNewCityController,
    GetAllCityController,
    UpdateACityController,
    DeleteACityController
} = require('../controller/City.Controller')

const { AdminAuthorizationMiddleware, CustomerAuthorizationMiddleware } = require('../middleware/Authorization.Middleware')

const CityRouter = express.Router()

CityRouter.post('/add', AdminAuthorizationMiddleware, CreateNewCityController)
CityRouter.get('/all',GetAllCityController)
CityRouter.put('/update', AdminAuthorizationMiddleware, UpdateACityController)
CityRouter.delete('/delete',DeleteACityController)


module.exports = CityRouter