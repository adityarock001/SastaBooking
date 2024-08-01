const { CreateNewUserInDBService } = require("../service/User.Service")

const httpStatus = require("http-status")

const bcrypt = require('bcrypt')

async function CreateNewUserController(req, res){
    try{

        const { name, email, password } = req.body

        if(!name || !email || !password){
            res.status(httpStatus.BAD_REQUEST).json({
                success : false,
                message : "Email, Name & Password is required"
            })
            return
        }
        
        const SALT = bcrypt.genSaltSync(10)

        const encryptedPassword = bcrypt.hashSync(password, SALT)

        const result = await CreateNewUserInDBService(name, email, encryptedPassword)

        if(result.success){
            res.status(httpStatus.CREATED).json({
                success : true,
                message : "User registered successfully"
            })
        }else{
            throw new Error("CreateNewUserController unable to create new user")
        }

    }catch(error){
        console.log(error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

module.exports = {
    CreateNewUserController
}