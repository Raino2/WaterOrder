const SQL = require('../utils/sql');
const UUID = require('../utils/uuid');

const Shop = {
  /**获取所有产品 */
  getProducts: (req, res) => {
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

  /**获取用户地址 */
  getUserAddress: (req, res) => {
    const sql = `
    SELECT uid,address,name,phone,isCommon
    FROM ADDRESS
    WHERE USERUID = '${req.query.uid}'
    `;

    SQL.createSQL(sql, [], (_, data) => {
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
  handleChangeCommonAddress: (req, res) => {
    const { uid, userUid } = req.body;
    const sql = `
    UPDATE ADDRESS
    SET ISCOMMON = 0
    WHERE ISCOMMON = 1 AND USERUID = '${userUid}';

    UPDATE ADDRESS
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
  handleCreateNewAddress: (req, res) => {
    const { userUid, address, name, phone, isCommon } = req.body;
    const uid = UUID.generateUUID();
    let sql;
    if (isCommon) {
      sql = `
      UPDATE ADDRESS
      SET ISCOMMON = 0
      WHERE ISCOMMON = 1 AND USERUID = '${userUid}';

      INSERT INTO ADRESS (UID,ADDRESS,USERUID,NAME,PHONE,ISCOMMON)
      VALUES (?,?,?,?,?,?);
    `;
    } else {
      sql = `
      INSERT INTO ADRESS (UID,ADDRESS,USERUID,NAME,PHONE,ISCOMMON)
      VALUES (?,?,?,?,?,?)
    `;
    }
    SQL.createSQL(sql, [uid, address, userUid, name, phone, isCommon], (err, data) => {
      if (data) {
        res.json(200, {
          data: {
            uid,
            address,
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

  /**创建订单 */
  handleCreateOrder: (req, res) => {
    const { createAt, userUid, sumPrice, count, address, productList } = req.body;
    const uid = UUID.generateUUID();

    const sqls = [
      {
        sql: `
          INSERT INTO \`ORDER\` (UID,CREATEAT,USERUID,SUMPRICE,COUNT,ADDRESS)
          VALUES (?,?,?,?,?,?);
        `,
        params: [uid, createAt, userUid, sumPrice, count, address],
      },
      ...productList.map((item) => {
        return {
          sql: `
          INSERT INTO ORDER_DETAIL (ORDERUID,PRODUCTUID,COUNT,SUMPRICE)
          VALUES(?,?,?,?)
        `,
          params: [uid, item.uuid, item.count, item.sumPrice],
        };
      }),
    ];

    SQL.createTransaction(sqls)
      .then(() => {
        res.json(200, {
          data: {
            uid,
            sumPrice,
            count,
            address,
            createAt,
            productList,
          },
          success: true,
        });
      })
      .catch(() => {
        res.json(401, {
          err: '下单失败',
          success: false,
        });
      });
  },
};

module.exports = Shop;
