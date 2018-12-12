const Test = require('../models/TestDrive')
const errorHandler = require('../utills/errorHandler')

module.exports.getAllTest = async function(req, res ) {
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
module.exports.createTest = async function(req, res ) {
    try {
        const lastTest = await Test.
        findOne({user: req.user.id})
        .sort({date: - 1})

        const maxTest = lastTest ? lastTest.test : 0

        const test = await  Test({
            list: req.body.list,
            user: req.user.id,
            test: maxTest + 1 
        }).save()
        res.status(201).json(test)
    } catch (e) {
        errorHandler(res,e)      
    }
}