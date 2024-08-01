const AdventureModel = require('../model/Adventure.Model')

async function CreateNewAdventureInDBService(cityId, name, category, images, duration, pricePerHead, currency){
    try {
        const result = await AdventureModel.create({
            cityId,
            name,
            category,
            images,
            duration,
            pricePerHead,
            currency
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

async function GetAllAdventureFromDBService(cityId){
    try {
        const result = await AdventureModel.find({cityId})

        if(result){
            return {
                success: true,
                data: result
            }
        }else{
            throw new Error("GetAllAdventureFromDBService unable to get the adventure")
        }
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}

async function UpdateAnAdventureFromDBService(AdventureId, data){
    try {
        const {name, category, images, duration, pricePerHead, currency} = data;
        const adventureDocument = await AdventureModel.findById(AdventureId)

        if(name){
            adventureDocument.name = name
        }
        if(category){
            adventureDocument.category = category
        }
        if(images){
            adventureDocument.images = images
        }
        if(duration){
            adventureDocument.duration = duration
        }
        if(pricePerHead){
            adventureDocument.pricePerHead = pricePerHead
        }
        if(currency){
            adventureDocument.currency = currency
        }

        const result = await adventureDocument.save()

        if(result){
            return {
                success: true,
                data: result
            }
        }else{
            throw new Error('UpdateAnAdventureFromBDService unable to update the adventure with id : ${AdventureId}')
        }
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}

async function DeleteAnAdventureFromDBService(AdventureId){
    try {

        const result = await AdventureModel.findByIdAndDelete(AdventureId)

        if(result){
            return {
                success: true,
                data: result
            }
        }else{
            throw new Error('DeleteAnAdventureFromBDService unable to delete an adventure with id : ${AdventureId}')
        }
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}


module.exports = {
    CreateNewAdventureInDBService,
    GetAllAdventureFromDBService,
    UpdateAnAdventureFromDBService,
    DeleteAnAdventureFromDBService
}