const SQL = require('../utils/sql');
const UUID = require('../utils/uuid');

const Shop = {
  /**获取所有产品 */
  getProducts: (req, res) => {
    const sql = `
    SELECT *
    FROM PRODUCT
    `;
    SQL.createSQL(sql, [], (err, data) => {
      res.json(200, {
        data,
        success: true,
      });
    });
  },

  /**获取用户地址 */
  getUserAdress: (req, res) => {
    const sql = `
    SELECT uid,adress,name,phone,isCommon
    FROM ADRESS
    WHERE USERUID = '${req.query.uid}'
    `;

    SQL.createSQL(sql, [], (err, data) => {
      if (data) {
        res.json(200, {
          data,
          success: true,
        });
      } else {
        res.json(401, {
          err: '地址为空或查询错误',
          data,
          success: false,
        });
      }
    });
  },

  /**更改用户默认地址 */
  handleChangeCommonAdress: (req, res) => {
    const { uid, userUid } = req.body;
    const sql = `
    UPDATE ADRESS
    SET ISCOMMON = 0
    WHERE ISCOMMON = 1 AND USERUID = '${userUid}';

    UPDATE ADRESS
    SET ISCOMMON = 1
    WHERE USERUID = '${userUid}' AND UID = '${uid}';

    `;

    SQL.createSQL(sql, [], (err, data) => {
      if (data) {
        res.json(200, {
          msg: '默认地址修改成功',
          success: true,
        });
      } else {
        console.log(err);
        res.json(401, {
          msg: '默认地址修改失败',
          success: false,
        });
      }
    });
  },

  /**添加新地址 */
  handleCreateNewAdress: (req, res) => {
    const { userUid, adress, name, phone, isCommon } = req.body;
    const uid = UUID.generateUUID();
    let sql;
    if (isCommon) {
      sql = `
      UPDATE ADRESS
      SET ISCOMMON = 0
      WHERE ISCOMMON = 1 AND USERUID = '${userUid}';

      INSERT INTO ADRESS (UID,ADRESS,USERUID,NAME,PHONE,ISCOMMON)
      VALUES (?,?,?,?,?,?);
    `;
    } else {
      sql = `
      INSERT INTO ADRESS (UID,ADRESS,USERUID,NAME,PHONE,ISCOMMON)
      VALUES (?,?,?,?,?,?)
    `;
    }
    SQL.createSQL(sql, [uid, adress, userUid, name, phone, isCommon], (err, data) => {
      if (data) {
        res.json(200, {
          data: {
            uid,
            adress,
            userUid,
            name,
            phone,
            isCommon,
          },
          success: true,
        });
      } else {
        res.json(401, {
          err: '添加地址失败',
          success: false,
        });
      }
    });
  },
};

module.exports = Shop;
