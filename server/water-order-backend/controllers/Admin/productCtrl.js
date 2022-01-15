const SQL = require('../../utils/sql');
const UUID = require('../../utils/uuid');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

const product = {
  /**产品图片上传 */
  handleUploadImg: (req, res, callback) => {
    console.log('接收到上传文件请求');
    var form = new formidable.IncomingForm({
      keepExtensions: true,
      uploadDir: path.join(__dirname, '../../public/images/products'),
    });

    form.encoding = 'utf-8';

    form.parse(req, function (err, fileds, file) {
      if (err) {
        callback(err);
      }
      fs.rename(file.file.filepath, form.uploadDir + `\\${file.file.originalFilename}`, (err) => {
        if (err)
          res.json(200, {
            data: `images/products/${file.file.newFilename}`,
            success: true,
          });
        else
          res.json(200, {
            data: `images/products/${file.file.originalFilename}`,
            success: true,
          });
      });
    });
  },

  /**获取所有产品 */
  handleGetProducts: (req, res) => {
    const sql = `
    SELECT *
    FROM PRODUCT
    `;
    SQL.createSQL(sql, [], (_, data) => {
      res.json(200, {
        data,
        success: true,
      });
    });
  },

  /**创建新产品 */
  handleCreateNewProduct: (req, res) => {
    const { isDisabled, name, isMPS, price, inventory, img, description } = req.body;
    const uid = UUID.generateUUID();
    const imgUrl = img ? `images/products/${img.file.name}` : '';

    const sql = `
    INSERT INTO PRODUCT(UID,ISDISABLED,NAME,ISMPS,PRICE,INVENTORY,IMG,DESCRIPTION)
    VALUES(?,?,?,?,?,?,?,?)
    `;

    SQL.createAsyncSQL(sql, [uid, isDisabled, name, isMPS, price, inventory, imgUrl, description])
      .then(() => {
        res.json(200, {
          data: '创建新产品成功',
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err: '创建失败',
          detail: err,
          success: false,
        });
      });
  },

  /**修改产品信息 */
  handleModifyProduct: (req, res) => {
    const { isDisabled, name, isMPS, price, inventory, img, description, uid } = req.body;
    let imgUrl = '';
    if (img && img.file && img.file.name) {
      imgUrl = `images/products/${img.file.name}`;
    }

    const sql = `
    UPDATE PRODUCT
    SET ISDISABLED = ?,NAME=?,ISMPS=?,PRICE=?,INVENTORY=?,IMG=?,DESCRIPTION=?
    WHERE UID = ?
    `;

    SQL.createAsyncSQL(sql, [isDisabled, name, isMPS, price, inventory, imgUrl, description, uid])
      .then(() => {
        res.json(200, {
          data: { isDisabled, name, isMPS, price, inventory, img: imgUrl, description, uid },
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, { err, success: false });
      });
  },

  /**删除产品 [预留接口] */
  handleRemoveProduct: (req, res) => {
    const { uid } = req;
    console.log(uid);
    const sql = `
    DELETE 
    FROM PRODUCT
    WHERE UID = ?
    `;

    SQL.createAsyncSQL(sql, [uid])
      .then(() => {
        res.json(200, {
          data: '删除产品成功',
          success: true,
        });
      })
      .catch(() => {
        res.json(401, {
          data: '删除失败',
          success: false,
        });
      });
  },
};

module.exports = product;
