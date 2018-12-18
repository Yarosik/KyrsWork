const Car = require('../models/Cars')
const errorHandler = require('../utills/errorHandler')

module.exports.getByCategoryId = async function (req, res) {
    try {
        const cars = await Car.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json(cars)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const cars = await new Car({
            name: req.body.name,
            color: req.body.color,
            about: req.body.about,
            cost: req.body.cost,
            category: req.body.category,
            imageSrc: req.file ? req.file.path : '',
            date: req.body.date,
            country: req.body.country,
            user: req.user.id
        }).save()
        res.status(201).json(cars)
    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.delete = async function (req, res) {
    try {
        await Car.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'Автомобиль был удалён'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {

    try {
        const cars = await Car.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(cars)
    } catch (e) {
        errorHandler(res, e)
    }
}