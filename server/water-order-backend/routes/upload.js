var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/Admin/uploadCtrl');

router.post('/temp', ctrl.setTemp);

module.exports = router;
