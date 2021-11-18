const SQL = require('../utils/sql');
const UID = require('../utils/uuid');

const register = {
  userRegister: async (res, req) => {
    const { userName, userPass, phone, email } = res.body;
    const uuid = UID.generateUUID();
    console.log('注册请求');
    console.log('用户注册信息：', res.body);

    const insert = `
    INSERT
    INTO USER
    (UID,USERNAME,USERPASS,PHONE,EMAIL)
    VALUES (?,?,?,?,?)
    `;

    const select = `
    SELECT *
    FROM USER
    WHERE UID = '${uuid}'
    `;

    const query = `
    SELECT *
    FROM USER
    WHERE USERNAME = '${userName}'
    `;

    //查验是否有重复账号
    await SQL.createSQL(query, [], (err, data) => {
      if (data) {
        req.json(401, {
          success: false,
          data: '注册失败，账号重复',
          error: err,
        });
      }
      return;
    });

    //创建账号
    await SQL.createSQL(insert, [uuid, userName, userPass, phone, email], (err, data) => {
      if (err) {
        req.json(401, {
          success: false,
          data: '注册失败',
          error: err,
        });
        return;
      }
    });

    //创建后返回用户信息
    await SQL.createSQL(select, [], (err, data) => {
      if (data) {
        req.json(200, {
          success: true,
          data,
        });
      } else {
        req.json(401.1, {
          success: false,
          data: '注册失败',
          error: err,
        });
      }
    });
  },
};

module.exports = register;
