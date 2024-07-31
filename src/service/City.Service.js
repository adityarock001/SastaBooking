const CityModel = require('../model/City.Model')

async function CreateNewCityInDBService(name, image, description, cuisines){
    try {
        const result = await CityModel.create({
            name, 
            image,
            description, 
            cuisines
        })

        if(result){
            return {
                success: true,
                data: result
            }
        }
        console.log(result)
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}

async function GetAllCityFromDBService(){
    try {
        const result = await CityModel.find()

        if(result){
            return {
                success: true,
                data: result
            }
        }else{
            throw new Error("GetAllCityFromDBService unable to get the city")
        }
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}

async function UpdateACityFromDBService(cityId, data){
    try {
        const {name, description, image, cuisines} = data;
        const cityDocument = await CityModel.findById(cityId)

        if(name){
            cityDocument.name = name
        }
        if(description){
            cityDocument.description = description
        }
        if(image){
            cityDocument.image = image
        }
        if(cuisines){
            cityDocument.cuisines = cuisines
        }

        const result = await cityDocument.save()

        if(result){
            return {
                success: true,
                data: result
            }
        }else{
            throw new Error('UpdateACityFromBDService unable to update the city with id : ${cityId}')
        }
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}

async function DeleteACityFromDBService(cityId){
    try {

        const result = await CityModel.findByIdAndDelete(cityId)

        if(result){
            return {
                success: true,
                data: result
            }
        }else{
            throw new Error('DeleteACityFromBDService unable to delete a city with id : ${cityId}')
        }
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}



module.exports = { 
    CreateNewCityInDBService, GetAllCityFromDBService, UpdateACityFromDBService, DeleteACityFromDBService
}