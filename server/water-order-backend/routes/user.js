var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/userCtrl');

/* GET users listing. */
router.get('/', ctrl.queryUser);
router.get('/rate', ctrl.queryUserRate);
router.post('/rate', ctrl.setUserRate);

module.exports = router;
