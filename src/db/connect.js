const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL).then(() => {
    console.log("Database Connected successfully!");
}).catch((err) => {
    console.error("error",err);
})