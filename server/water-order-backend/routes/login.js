var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/loginCtrl');

router.post('/', ctrl.userLogin);

module.exports = router;
