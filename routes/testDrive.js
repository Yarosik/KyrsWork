const express = require('express');
const passport = require('passport')
const controller = require('../controllers/testDrive')
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllTest)
router.post('/', passport.authenticate('jwt', {session: false}), controller.createTest)


module.exports = router;