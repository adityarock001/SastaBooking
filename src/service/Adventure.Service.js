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




module.exports = {
    CreateNewAdventureInDBService
}