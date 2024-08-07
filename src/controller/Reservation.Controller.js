const {BookSlotForAdventureInDBService} = require("../service/AdventureDetail.Service")
const {CreateNewReservationInDBService} = require("./../service/Reservation.Service")

async function CreateNewReservationController(req, res){
    try{

        const {userid : userId} = req;

        const {adventureid : adventureId} = req.query;

        const {date, numberOfPerson, paymentMode} = req.body;

        const [day, month, year] = date.split("-").map(Number)

        const modifiedDate = new Date(Date.UTC(year, month-1, day))

        const BookSlotResult = await BookSlotForAdventureInDBService(adventureId, modifiedDate, numberOfPerson)

        if(!BookSlotResult.success){
            throw new Error("BookSlotForAdventureInDBService unable to book slot")
        }

        const ReservationResult = await CreateNewReservationInDBService(userId, adventureId, modifiedDate, numberOfPerson, false, paymentMode)

        if(!ReservationResult.success){
            throw new Error("CreateNewReservationInDBService unable to create reservation")
        }

        res.status(201).json({
            success : true,
            data : ReservationResult.data
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

module.exports = {
    CreateNewReservationController
}