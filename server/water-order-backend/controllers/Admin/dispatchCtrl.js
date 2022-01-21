const SQL = require('../../utils/sql');
const UUID = require('../../utils/uuid');
const ORDER_STATUS = require('../../constants/order');

const dispatch = {
  /** 获取所有配送员信息 **/
  handleGetDispatchers: (req, res) => {
    const sql = `
    SELECT *
    FROM DISPATCHER
    `;

    SQL.createAsyncSQL(sql, [])
      .then((data) => {
        res.json(200, {
          data,
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err,
          success: false,
        });
      });
  },

  /** 获取指定配送员信息 **/
  handleGetDispatcher: (req, res) => {
    const { uid } = req.query;
    const sql = `
    SELECT *
    FROM DISPATCHER
    WHERE UID = ?
    `;

    SQL.createAsyncSQL(sql, [uid])
      .then((data) => {
        res.json(200, {
          data,
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err,
          success: false,
        });
      });
  },

  /** 新增配送员 **/
  handleCreateDispatcher: (req, res) => {
    const { name, age, workAge, regionId, avatar } = req.body;
    const uid = UUID.generateUUID();

    const sql = `
    INSERT INTO DISPATCHER(uid,name,age,workAge,regionId,avatar)
    VALUES(?,?,?,?,?,?)
    `;

    SQL.createAsyncSQL(sql, [uid, name, age, workAge, regionId || null, avatar || null])
      .then(() => {
        res.json(200, {
          data: '创建新配送员成功',
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err,
          success: false,
        });
      });
  },

  /** 修改配送员 **/
  handleModifyDispatcher: (req, res) => {
    const { uid, name, age, workAge, regionId, avatar } = req.body;

    const sql = `
    UPDATE DISPATCHER
    set name=?,age=?,workAge=?,regionId=?,avatar=?
    where uid = ?
    `;

    SQL.createAsyncSQL(sql, [name, age, workAge, regionId || null, avatar || null, uid])
      .then(() => {
        res.json(200, {
          data: '更新配送员信息成功',
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err,
          success: false,
        });
      });
  },

  /** 删除配送员 **/
  handleDeleteDispatcher: (req, res) => {
    const { uid } = req.query;
    const sql = `
    DELETE
    FROM DISPATCHER
    WHERE UID = '${uid}'
    `;

    SQL.createAsyncSQL(sql, [])
      .then(() => {
        res.json(200, {
          data: '删除成功',
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err: '删除失败',
          errMessage: err,
          success: false,
        });
      });
  },

  /** 获取配送单 **/
  handleGetDispatch: (req, res) => {
    const sql = `
    SELECT *
    FROM DISPATCH
    `;

    SQL.createAsyncSQL(sql, []).then((data) => {
      res
        .json(200, {
          data,
          success: true,
        })
        .catch((err) => {
          res.json(401, {
            err,
            success: false,
          });
        });
    });
  },

  /** 创建配送单 **/
  handleCreateDispatch: async (req, res) => {
    const { orderUid, dispatcherUid, createAt, regionId, fee } = req.body;
    const uid = UUID.generateUUID();
    let regionName;
    let dispatcherName;
    const status = ORDER_STATUS.DISPATCH;

    // ------ SQL语句 ------

    const checkRegionName = `
    SELECT REGIONNAME
    FROM REGION
    WHERE REGIONID = ?
    `;

    const checkDispatcherName = `
    SELECT NAME
    FROM DISPATCHER
    WHERE UID = ?
    `;

    const dispatchSQL = `
      INSERT DISPATCH(UID,ORDERUID,DISPATCHERUID,CREATEAT,REGIONNAME,REGIONID,FEE,STATUS)
      VALUES(?,?,?,?,?,?,?,?)
      `;

    const orderSQL = `
      UPDATE \`ORDER\`
      SET DISPATCHER = ?,DISPATCHERNAME = ?,DISPATCHERFEE = ?,STATUS = ?
      WHERE UID = ?
      `;

    // ------ ------

    Promise.all([
      SQL.createAsyncSQL(checkRegionName, [regionId]),
      SQL.createAsyncSQL(checkDispatcherName, [dispatcherUid]),
    ]).then((result) => {
      //DEBUG
      console.log(result);

      regionName = result[0][0].REGIONNAME;
      dispatcherName = result[1][0].NAME;

      SQL.createTransaction([
        {
          sql: dispatchSQL,
          params: [uid, orderUid, dispatcherUid, createAt, regionName, regionId, fee, status],
        },
        {
          sql: orderSQL,
          params: [dispatcherUid, dispatcherName, fee, status, orderUid],
        },
      ])
        .then(() => {
          res.json(200, {
            data: '创建配送单成功',
            success: true,
          });
        })
        .catch((err) => {
          res.json(401, {
            err,
            success: false,
          });
        });
    });
  },

  /** 获取配送单详情 **/
  handleGetDispatchInfo: (req, res) => {
    const { uid, orderUid } = req.query;
    const sql = `
    SELECT *
    FROM DISPATCH
    WHERE UID = ? OR ORDERUID = ?
    `;

    SQL.createAsyncSQL(sql, [uid, orderUid])
      .then((data) => {
        if (data && data.length) {
          res.json(200, {
            data: data[0],
            success: true,
          });
        } else {
          res.json(401, {
            err: '配送单不存在',
            success: false,
          });
        }
      })
      .catch((err) => {
        res.json(401, {
          err,
          success: false,
        });
      });
  },

  /** 获取配送单所需订单信息 **/
  handleGetDispatchOrderInfo: (req, res) => {
    const { uid } = req.query;
    const sql = `
    SELECT *
    FROM \`order\`
    WHERE UID = ?
    `;

    SQL.createAsyncSQL(sql, [uid])
      .then((data) => {
        res.json(200, {
          data: data[0],
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err,
          success: false,
        });
      });
  },

  /** 获取配送单所需地址信息 **/
  handleGetDispatchAddressInfo: (req, res) => {
    const { uid } = req.query;

    const sql = `
    SELECT address,name,phone
    FROM ADDRESS
    WHERE UID = ?
    `;

    SQL.createAsyncSQL(sql, [uid])
      .then((data) => {
        res.json(200, {
          data: data[0],
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err,
          success: false,
        });
      });
  },

  /** 订单开始配送 */
  handleStartDispatch: (req, res) => {
    const { uid } = req.body;

    const dispatchSQL = `
    UPDATE DISPATCH
    SET STATUS = ?
    WHERE ORDERUID = ?
    `;
    const orderSQL = `
    UPDATE \`ORDER\`
    SET STATUS = ?
    WHERE UID = ?
    `;

    SQL.createTransaction([
      {
        sql: dispatchSQL,
        params: [ORDER_STATUS.DELIVERING, uid],
      },
      {
        sql: orderSQL,
        params: [ORDER_STATUS.DELIVERING, uid],
      },
    ])
      .then(() => {
        res.json(200, {
          data: '订单开始配送',
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err: '订单状态修改失败',
          detail: err,
          success: false,
        });
      });
  },

  /** 订单完成配送 */
  handleEndDispatch: (req, res) => {
    const { uid, endAt } = req.body;

    const dispatchSQL = `
    UPDATE DISPATCH
    SET STATUS = ?,ENDAT = ?
    WHERE ORDERUID = ?
    `;
    const orderSQL = `
    UPDATE \`ORDER\`
    SET STATUS = ?
    WHERE UID = ?
    `;

    SQL.createTransaction([
      {
        sql: dispatchSQL,
        params: [ORDER_STATUS.DONE, endAt, uid],
      },
      {
        sql: orderSQL,
        params: [ORDER_STATUS.DONE, uid],
      },
    ])
      .then(() => {
        res.json(200, {
          data: '订单完成配送',
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err: '订单状态修改失败',
          detail: err,
          success: false,
        });
      });
  },
};

module.exports = dispatch;
