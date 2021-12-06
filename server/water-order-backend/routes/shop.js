var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/shopCtrl');

router.get('/', ctrl.getProducts);
router.get('/adress', ctrl.getUserAdress);
router.put('/adress/common', ctrl.handleChangeCommonAdress);
router.post('/adress', ctrl.handleCreateNewAdress);

module.exports = router;
