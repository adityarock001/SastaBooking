const UserModel = require('../model/User.Model')

async function CreateNewUserInDBService(name, email, encryptedPassword){
    try {
        const result = await UserModel.create({
            name,
            email,
            password : encryptedPassword
        })

        if(result){
            return {
                success: true,
                data: result
            }
        }else{
            throw new Error("CreateNewUserInDBService unable to create user")
        }
        
    } catch(err) {
        console.error(err)
        return {
            success: false
        }
    }
}

module.exports = {
    CreateNewUserInDBService
}