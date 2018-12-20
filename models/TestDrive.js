const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testDriveSchema = new Schema ({
    date: {
        type: Date,
        default: Date.now
    },
    test:{
        type:Number,
        required: true
    },
    list: [
        {
            name:{
                type: String
            },
            cost: {
                type: Number
            },
            dat: {
                type: Date
            }
        }
    ],
    user: {
        ref: "users",
        type: Schema.Types.ObjectId
    },
    car: {
        ref: "cars",
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('testsDrive', testDriveSchema)