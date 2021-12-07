var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/shopCtrl');

router.get('/', ctrl.getProducts);
router.get('/address', ctrl.getUserAddress);
router.put('/address/common', ctrl.handleChangeCommonAddress);
router.post('/address', ctrl.handleCreateNewAddress);

module.exports = router;
