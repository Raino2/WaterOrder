var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/loginCtrl');

router.post('/account', ctrl.loginWithAccount);

module.exports = router;
