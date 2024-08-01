const { CreateNewAdventureDetailInDBService } = require("../service/AdventureDetail.Service")

const httpStatus = require("http-status")

async function CreateNewAdventureDetailController(req, res){
    try{

        const { adventureid : adventureId } = req.query

        const { subtitle, description, slots } = req.body

        const modifiedDateSlots = slots.map((element)=>{

           const [day, month, year] = element.date.split("-").map(Number)

           const date = new Date(Date.UTC(year, month-1, day))

           return {
                date,
                numberOfPerson : element.numberOfPerson
           }

        })

        const result = await CreateNewAdventureDetailInDBService(adventureId, subtitle, description, modifiedDateSlots)

        if(result.success){

            res.status(httpStatus.CREATED).json({
                success : true,
                data : result.data
            })

        }else{
            throw new Error("CreateNewAdventureDetailController unable to create new adventure detail")
        }
        

    }catch(error){
        console.log(error)
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

module.exports = {
    CreateNewAdventureDetailController
}