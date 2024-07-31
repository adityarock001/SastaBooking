const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cuisines: {
        type: [String]
    }
})

const CityModel = mongoose.model("cities", CitySchema);

module.exports = CityModel;