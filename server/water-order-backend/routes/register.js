var express = require('express')
var router = express.Router();
var ctrl = require('../controllers/registerCtrl');

router.post('/', ctrl.userRegister);

module.exports = router;