const httpStatus = require("http-status")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {GetUserByUserIdFromDBService} = require('../service/User.Service')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function AdminAuthorizationMiddleware(req, res, next){
    try {

        const token = req.headers.authorization.split(" ")[1]

        const payload = jwt.verify(token, JWT_SECRET_KEY)
        
        const{userid : userId} = payload

        const result = await GetUserByUserIdFromDBService(userId)
        
        if(!result.success){
            throw new Error()
        }

        const {role} = result.data

        if(role === "admin"){
            next()
        }else{
            throw new Error()
        }

    } catch(err) {

        console.log(err)
        res.status(err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : err.status ? err.message : "Something went wrong"
        })
    }
}

async function CustomerAuthorizationMiddleware(req, res, next){
    try {

        const token = req.headers.authorization.split(" ")[1]

        const payload = jwt.verify(token, JWT_SECRET_KEY)
        
        const{userid : userId} = payload

        const result = await GetUserByUserIdFromDBService(userId)
        
        if(!result.success){
            throw new Error()
        }

        const {role} = result.data

        if(role === "customer" || role === "admin"){
            req.userid = userId
            next()
        }else{
            throw new Error()
        }

    } catch(err) {

        console.log(err)
        res.status(err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : err.status ? err.message : "Something went wrong"
        })
    }
}


module.exports = {
    AdminAuthorizationMiddleware,
    CustomerAuthorizationMiddleware
}