const SQL = require('../utils/sql');
const UID = require('../utils/uuid');

const register = {
  userRegister: (res, req) => {
    const { userName, userPass, phone, email } = res.body;
    const uid = UID.generateUUID();
    console.log('注册请求');
    console.log('用户注册信息：', res.body);

    const insert = `
    INSERT
    INTO USER
    (UID,USERNAME,USERPASS,PHONE,EMAIL)
    VALUES (?,?,?,?,?)
    `;

    const query = `
    SELECT *
    FROM USER
    WHERE USERNAME = '${userName}'
    `;

    //查验是否有重复账号
    SQL.createSQL(query, [], (err, data) => {
      if (data.length) {
        req.json(401, {
          success: false,
          data: '注册失败，账号重复',
          error: err,
        });
      } else {
        //创建账号
        SQL.createSQL(insert, [uid, userName, userPass, phone, email], (err, data) => {
          console.log('err', err);
          console.log('data', data);
          if (!data.affectedRows) {
            req.json(401, {
              success: false,
              data: '注册失败',
              error: err,
            });
          } else {
            req.json(200, {
              userName,
              userPass,
              phone,
              email,
              uid,
            });

            //------插入数据到用户详情表------
            const insetDetail = `
              INSERT
              INTO USER_DETAIL
              (UID,USERNAME)
              VALUES (?,?)`;
            SQL.createSQL(insetDetail, [uid, userName]);
          }
        });
      }
    });
  },
};

module.exports = register;
