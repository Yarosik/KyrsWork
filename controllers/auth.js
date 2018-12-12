const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utills/errorHandler')


module.exports.login = async function(req,res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        //Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        /*if(req.body.password ==='admin' && req.body.email==='admin'){
            res.status(200).json({
                message: "Здравствуй, админ!"
            })
        }*/
        
        if(passwordResult){
            //Token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60})

            res.status(200).json({
               token: `Bearer  ${token}`
            })
        } else {
            //Неверный пароль
            res.status(401).json({
                message: "Пароль неверный."
            })
        }
    } else  {
        //Пользователя нет, ошибка
        res.status(404).json({
            message: "Пользователь не найден."
        })
    }
}

module.exports.register = async function(req,res) {
   const candidate = await User.findOne({email: req.body.email})

   if(candidate)    {
       //Пользователь сущ, ошибка
       res.status(409).json({
           message: "Такой email уже занят. Попробуйте другой."
       })
   }   else    {
       //Создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        }   catch(e) {
            errorHandler(res, error)
        }    
   }
}