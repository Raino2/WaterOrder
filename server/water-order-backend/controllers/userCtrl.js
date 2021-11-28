const SQL = require('../utils/sql');

const user = {
  queryUser: (req, res) => {
    const { uid } = req.query;
    const sql = `
      SELECT *
      FROM USER
      WHERE UID = '${uid}' 
    `;

    SQL.createSQL(sql, [], (err, data) => {
      if (data.length) {
        res.json(200, {
          data,
          success: true,
        });
      } else {
        res.json(401, {
          err: '查询失败',
          success: false,
        });
      }
    });
  },

  queryUserRate: (req, res) => {
    const { uid } = req.query;
    const queryRate = `
    SELECT RATE as rate
    FROM USER_DETAIL
    WHERE UID = '${uid}'
    `;
    console.log(queryRate);
    SQL.createSQL(queryRate, [], (_, data) => {
      res.json(200, {
        data,
        success: true,
      });
    });
  },

  setUserRate: (req, res) => {
    const { uid, rate } = req.body;
    const sql = `
    UPDATE USER_DETAIL
    SET RATE = ${rate}
    WHERE UID = '${uid}'
    `;

    console.log(sql);
    SQL.createSQL(sql, [], (err, data) => {
      if (!data.affectedRows) {
        res.json(401, {
          err: '请求失败',
          success: false,
        });
      } else {
        res.json(200, {
          data: [{ rate }],
          success: true,
        });
      }
    });
  },
};

module.exports = user;
