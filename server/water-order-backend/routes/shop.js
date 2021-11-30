var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/shopCtrl');

router.get('/', ctrl.getProducts);

module.exports = router;
