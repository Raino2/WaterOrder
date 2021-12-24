var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/adminCtrl');

router.get('/', ctrl.getProducts);

module.exports = router;
