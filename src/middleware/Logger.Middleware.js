const httpStatus = require("http-status")
const fs = require('fs')

async function RequestPathAndMethodLoggerMiddleware(req, res, next){
    try {

        const { method, path } = req
        // console.log(method, path)
        const log = `Timestamp : ${new Date()} Path- ${path} Method- ${method}\n`
        fs.appendFileSync('req.log.txt', log, 'utf-8')
        next()

    } catch(error) {

        console.log(error)
        res.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : error.status ? error.message : "Something went wrong"
        })
    }
}


module.exports = {
    RequestPathAndMethodLoggerMiddleware
}