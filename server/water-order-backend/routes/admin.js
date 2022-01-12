var express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/Admin/productCtrl');
const userCtrl = require('../controllers/Admin/userCtrl');
const orderCtrl = require('../controllers/Admin/orderCtrl');
const regionCtrl = require('../controllers/Admin/regionCtrl');

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

/** 订单 **/
router.get('/order/:uuid?', orderCtrl.handleGetOrder);
router.get('/order-detail', orderCtrl.handleGetOrderDetail);

/** 地区 **/
router.get('/region', regionCtrl.handleGetRegion);
router.post('/region', regionCtrl.handleCreateRegion);
router.put('/region', regionCtrl.handleModifyRegion);
router.delete('/region', regionCtrl.handleDeleteRegion);

module.exports = router;
