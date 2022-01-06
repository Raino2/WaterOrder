const SQL = require('../../utils/sql');
const UUID = require('../../utils/uuid');

const user = {
  /** 查询所有用户信息 **/
  handleGetAllUser: (req, res) => {
    const sql = `
    SELECT *
    FROM USER JOIN USER_DETAIL USING(UID,USERNAME)
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

  /** 查询用户详情信息 */
  handleGetUserInfo: (req, res) => {
    console.log(req);
    const { uid } = req.query;

    const sql = `
    SELECT *
    FROM USER JOIN USER_DETAIL USING(UID,USERNAME)
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

  /** 用户权限变更**/
  handleSetAdmin: (req, res) => {
    const { uid, isAdmin } = req.body;
    const sql = `
    UPDATE USER_DETAIL
    SET ISADMIN = ${isAdmin}
    WHERE UID = '${uid}'
    `;

    SQL.createAsyncSQL(sql, [])
      .then(() => {
        res.json(200, {
          data: '权限变更成功',
          success: true,
        });
      })
      .catch(() => {
        res.json(401, {
          err: '权限变更失败',
          success: false,
        });
      });
  },

  /** 创建新用户(非管理员) **/
  handleCreateNewUser: (req, res) => {
    const { userName, userPass, phone, email } = req.body;
    const uid = UUID.generateUUID();
    console.log('注册请求');
    console.log('用户注册信息：', req.body);

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
    try {
      SQL.createSQL(query, [], (err, data) => {
        if (data.length) {
          res.json(401, {
            success: false,
            data: '注册失败，账号重复',
            error: err,
          });
        } else {
          //创建账号
          SQL.createSQL(insert, [uid, userName, userPass, phone, email], (err, data) => {
            console.log('err', err);
            console.log('data', data);
            if (!data) {
              res.json(401, {
                success: false,
                data: '注册失败',
                error: err,
              });
            } else {
              res.json(200, {
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
              (UID,USERNAME,ISADMIN)
              VALUES (?,?,?)`;
              SQL.createSQL(insetDetail, [uid, userName, false]);
            }
          });
        }
      });
    } catch (err) {
      res.json(401, {
        err: '注册失败',
        success: false,
      });
    }
  },

  /** 更改用户信息(非管理员) **/
  handleModifyUser: (req, res) => {
    console.log('接收到更改用户信息请求');
    const { uid, userPass, userRealName, phone, email, rate } = req.body;
    let sql = `
    UPDATE USER
    SET UID = '${uid}'
    `;

    if (userPass) sql += `,USERPASS = '${userPass}'`;
    if (userRealName) sql += `,USERREALNAME = '${userRealName}'`;
    if (phone) sql += `,PHONE = '${phone}'`;
    if (email) sql += `,EMAIL = '${email}'`;

    sql += ` WHERE UID ='${uid}'; `;

    sql += `
    UPDATE USER_DETAIL
    SET RATE = ${rate || 0}
    WHERE UID = '${uid}'
    `;
    SQL.createAsyncSQL(sql, [])
      .then((data) => {
        res.json(200, {
          data: '修改用户信息成功',
          success: true,
        });
      })
      .catch((err) => {
        res.json(401, {
          err: '修改用户信息失败',
          success: false,
        });
      });
  },

  /** 用户创建新地址 **/
  handleCreateNewUserAddress: (req, res) => {},

  /** 用户修改默认地址 **/
  handleModifyCommonAddress: (req, res) => {},
};

module.exports = user;
