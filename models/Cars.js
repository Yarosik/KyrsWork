const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carsSchema = new Schema ({
    name: {
        type:String,
        required: true
    },
    color: {
        type:String,
        required: false
    },
    about: {
        type:String,
        required: false
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: "categories",
        type: Schema.Types.ObjectId
    },
    imageSrc:{
        type :String,
        required: false
    },
    date: {
        type:String,
        required: false
    },
    country:{
        type:String,
        required: false
    },
    user: {
        ref: "users",
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('cars', carsSchema)