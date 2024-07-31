const {CreateNewAdventureInDBService} = require('../service/Adventure.Service')

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


module.exports = {CreateNewAdventureController}