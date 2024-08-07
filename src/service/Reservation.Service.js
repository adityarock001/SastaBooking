const ReservationModel = require('../model/Reservation.Model')

async function CreateNewReservationInDBService(userId, adventureId, reservationDate, numberOfPerson, paymentStatus, paymentMode, PaymentAmount){
    try{

        const result = await ReservationModel.create({
            userId,
            adventureId,
            slot : {
                date : reservationDate,
                numberOfPerson
            },
            payment : {
                mode : paymentMode,
                status : paymentStatus,
                amount : PaymentAmount
            }
        })

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("CreateNewReservationInDBService unable to create reservation")
        }
    }catch(err){
        console.log(err);
        return{
            success : false
        }
    }
}

module.exports = { CreateNewReservationInDBService }