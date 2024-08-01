const {
    CreateNewAdventureInDBService,
    GetAllAdventureFromDBService,
    UpdateAnAdventureFromDBService,
    DeleteAnAdventureFromDBService
} = require('../service/Adventure.Service')

async function CreateNewAdventureController(req, res) {
    try {
        const {id : cityId} = req.query
        const {name, category, images, duration, pricePerHead, currency} = req.body;

        const result = await CreateNewAdventureInDBService(cityId, name, category, images, duration, pricePerHead, currency)
        
        if(!result.success) {
            throw new Error("CreateNewAdventureInDBService failed to complete task")
        }

        res.status(201).json({
            success: true,
            data: result.data
        })
        // res.json({
        //     success: true
        // })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function GetAllAdventureController(req, res) {
    try {
        const {id : cityId} = req.query
        const result = await GetAllAdventureFromDBService(cityId)

        if(result.success){
            res.status(200).json({
                success: true,
                data: result.data
            }) 
        }else{
            throw new Error(`GetAllAdventuresFromDBService didn't get any adventures for cityId : ${cityId}`)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function UpdateAnAdventureController(req, res) {
    try {
        const { id : AdventureId } = req.query 

        const {name, category, images, duration, pricePerHead, currency} = req.body;

        const DATA = {}

        if(name){
            DATA.name = name
        }
        if(category){
            DATA.category = category
        }
        if(images){
            DATA.images = images
        }
        if(duration){
            DATA.duration = duration
        }
        if(pricePerHead){
            DATA.pricePerHead = pricePerHead
        }
        if(currency){
            DATA.currency = currency
        }

        const result = await UpdateAnAdventureFromDBService(AdventureId, DATA)

        if(result.success){
            res.status(200).json({
                success: true,
                data: result.data
            }) 
        }else{
            throw new Error("UpdateAnAdventureFromDBService didn't give result")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

async function DeleteAnAdventureController(req, res) {
    try {
        const { id : AdventureId } = req.query 

        const result = await DeleteAnAdventureFromDBService(AdventureId)

        if(result.success){
            res.status(200).json({
                success: true,
                data: res.data
            }) 
        }else{
            throw new Error("DeleteAnAdventureFromDBService didn't give result")
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
    CreateNewAdventureController,
    GetAllAdventureController,
    UpdateAnAdventureController,
    DeleteAnAdventureController
}