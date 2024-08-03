const { CreateNewUserInDBService, GetUserByEmailFromDBService } = require("../service/User.Service")

const httpStatus = require("http-status")

const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

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

async function SignInUserController(req, res){
    try{
        const {email, password} = req.body
        if(!email || !password){
            
            const err = new Error("Email and Password are required")
            err.status = httpStatus.BAD_REQUEST
            throw err
        }
        //step-1: we have to verify the email & password
        const userResult = await GetUserByEmailFromDBService(email)

        if(!userResult.success){
            const err = new Error("Invalid email or password")
            err.status = httpStatus.BAD_REQUEST
            throw err
        }

        const {password : encryptedPassword, _id : userId} = userResult.data

        //password check
        const passwordCompareResult = bcrypt.compareSync(password, encryptedPassword)

        if(!passwordCompareResult){
            const err = new Error("Invalid Email or Password")
            err.status = httpStatus.BAD_REQUEST
            throw err
        }

        //step-2: we will generate the token and will send back to the client
        const PAYLOAD = {
            userid : userId
        }
        const token = jwt.sign(PAYLOAD, JWT_SECRET_KEY, {expiresIn : '1h'})

        res.status(httpStatus.CREATED).json({
            success : true,
            token
        })
        
    }catch(error){
        console.log(error)
        res.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : error.status ? error.message : "Something went wrong"
        })
    }
} 

module.exports = {
    CreateNewUserController,
    SignInUserController
}