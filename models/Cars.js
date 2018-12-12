const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carsSchema = new Schema ({
    name: {
        type:String,
        required: true
    },
    mark: {
        type:String,
        required: true
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
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    car:{
        type:Number,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    list: [
        {
            name:{
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    user: {
        ref: "users",
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('cars', carsSchema)