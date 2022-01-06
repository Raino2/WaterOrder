var express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/Admin/productCtrl');
const userCtrl = require('../controllers/Admin/userCtrl');

/** 产品 **/
router.get('/product', productCtrl.handleGetProducts);
router.post('/product', productCtrl.handleCreateNewProduct);
router.put('/product', productCtrl.handleModifyProduct);
router.post('/product/upload-img', productCtrl.handleUploadImg);

/** 用户 **/
router.get('/user', userCtrl.handleGetAllUser);
router.post('/user', userCtrl.handleCreateNewUser);
router.put('/user', userCtrl.handleModifyUser);
router.get('/user/info', userCtrl.handleGetUserInfo);
router.patch('/user/admin', userCtrl.handleSetAdmin);

module.exports = router;
