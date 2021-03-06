const Category = require('../models/Category')
const Car = require('../models/Cars')
const errorHandler = require('../utills/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({
            category: req.params.id
        })
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function (req, res) {
    try {
        await Category.remove({
            _id: req.params.id
        })
        await Car.remove({
            category: req.params.id
        })
        res.status(200).json({
            message: 'Марка удалена'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const category = new Category({
        name: req.body.name,
        category: req.params.id,
        imageSrc: req.file ? req.file.path : ''
    })
    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name
    }

    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const category = await Category.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}