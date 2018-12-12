const Car = require('../models/Cars')
const errorHandler = require('../utills/errorHandler')

module.exports.getAllCars = async function(req, res ) {
    const query = {
        user: req.user.id
    }
    if(req.query.start){
        query.date = {
            $gte: req.query.start
        }
    }

    if(req.query.end){
        if(!query.date){
            query.date = {}
        }
        query.date['$lte'] = req.query.end
    }

    if(req.query.test){
        query.test = +req.query.test
    }
    try {
        const tests = await Test
        .find(query)
        .sort({date: -1})
        .skip(+req.query.offset)
        .limit(+rq.query.limit)

        res.status(200).json(tests)

    } catch(e){
      errorHandler(res,e)      
    }
}


module.exports.getByCategoryId = async function(req, res ) {
    try {   
      const cars =  await Cars.find({
        category: req.params.categoryId,
        user: req.user.id
      })
      res.status(200).json(cars)
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.create = async function(req, res ) {
      const car = await new Car({
          name: req.body.name,
          mark: req.body.mark,
          cost: req.body.cost,
          category: req.body.category,  
          user: req.user.id,
          imageSrc: req.file ?  req.file.path : ''
      }) 
    try{
      await car.save()
      res.status(201).json(car)
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.delete = async function(req, res ) {
    try{
        await Car.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Автомобиль был удалён'
        })
    } catch(e){
        errorHandler(res,e)
    }
}

module.exports.update = async function(req, res ) {
    const updated = {
        name: req.body.name
    }
    if(req.file){
        updated.imageSrc = req.file.path
    }
    try{
        const cars = await Car.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(cars)
    } catch(e){
        errorHandler(res,e)
    }
}
