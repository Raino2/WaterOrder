var express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/Admin/product');

/**  产品 **/
router.get('/product', productCtrl.handleGetProducts);
router.post('/product', productCtrl.handleCreateNewProduct);
router.put('/product', productCtrl.handleModifyProduct);
router.post('/product/upload-img', productCtrl.handleUploadImg);

module.exports = router;
