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
        req.send({
          success: true,
          data,
        });
      } else {
        req.json(400, {
          success: false,
          data: '登陆失败，用户名或密码错误！',
          error: err,
        });
      }
    });
  },
};

module.exports = login;
