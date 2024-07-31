const {CreateNewCityInDBService, GetAllCityFromDBService, UpdateACityFromDBService, DeleteACityFromDBService} = require('../service/City.Service')

async function CreateNewCityController(req, res) {
    try {
        const {name, image, description, cuisines} = req.body;

        const result = await CreateNewCityInDBService(name, image, description, cuisines)
        
        if(!result.success) {
            throw new Error("CreateNewCityInDBService failed to complete task")
        }

        res.status(201).json({
            success: true,
            data: result.data
        })
        res.json({
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function GetAllCityController(req, res) {
    try {
        const result = await GetAllCityFromDBService()

        if(result.success){
            res.status(200).json({
                success: true,
                data: result.data
            }) 
        }else{
            throw new Error("GetAllCityFromDBService didn't get any city")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function UpdateACityController(req, res) {
    try {
        const { id : cityId } = req.query 

        const {name, description, image, cuisines} = req.body;

        const DATA = {}

        if(name){
            DATA.name = name
        }
        if(description){
            DATA.description = description
        }
        if(image){
            DATA.image = image
        }
        if(cuisines){
            DATA.cuisines = cuisines
        }

        const result = await UpdateACityFromDBService(cityId, DATA)

        if(result.success){
            res.status(200).json({
                success: true,
                data: res.data
            }) 
        }else{
            throw new Error("UpdateACityFromDBService didn't give result")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function DeleteACityController(req, res) {
    try {
        const { id : cityId } = req.query 

        const result = await DeleteACityFromDBService(cityId)

        if(result.success){
            res.status(200).json({
                success: true,
                data: res.data
            }) 
        }else{
            throw new Error("DeleteACityFromDBService didn't give result")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

module.exports = {
    CreateNewCityController, GetAllCityController, UpdateACityController, DeleteACityController
}