const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL).then(() => {
    console.log("Runs successfully");
}).catch((error) => {
    console.error("error",error);
})