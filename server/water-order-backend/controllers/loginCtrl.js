const SQL = require('../utils/sql');

const login = {
  loginWithAccount: (res, req) => {
    const userName = res.body.userName;
    const userPass = res.body.userPass;
    console.log('接收到用户登录请求了！');
    console.log('userName:', userName);
    console.log('userPass:', userPass);

    const sql = `
      SELECT *
      FROM USER
      WHERE USERNAME = '${userName}' AND USERPASS = '${userPass}' 
    `;

    SQL.createSQL(sql, [], (err, data) => {
      if (data.length) {
        req.json(200, {
          success: true,
          data,
        });
      } else {
        req.json(401.1, {
          success: false,
          data: '登陆失败，用户名或密码错误！',
          error: err,
        });
      }
    });
  },

  /** 查询用户是否为管理员 */
  checkAdmin: (req, res) => {
    const { uid } = req.query;

    const sql = `
    SELECT ISADMIN
    FROM USER_DETAIL
    WHERE UID = ?
    `;

    SQL.createAsyncSQL(sql, [uid])
      .then((data) => {
        if (data && data.length && data[0].ISADMIN) {
          res.json(200, {
            data: '用户为管理员',
            success: true,
          });
        } else {
          res.json(401, {
            err: '普通用户',
            success: false,
          });
        }
      })
      .catch(() => {
        res.json(401, {
          err: '普通用户',
          success: false,
        });
      });
  },
};

module.exports = login;
