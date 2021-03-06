const express = require('express');
const controller = require('../controllers/cars')
const upload = require('../middleware/upload')
const passport = require('passport')
const router = express.Router();




router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId)
router.post('/', passport.authenticate('jwt', {session: false}),upload.single('image'), controller.create)
router.patch('/:id',passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)


module.exports = router;