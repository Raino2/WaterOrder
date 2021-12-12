const mysqlDB = require('mysql');

//数据库配置信息
const mysqlConfig = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'raino123',
  database: 'water_order',
  multipleStatements: true,
};

//自定义封装的SQL方法，后续可以再进一步封装
const SQL = {
  /**
   *创建一个SQL操作
   * @param {*} sql 查询语句
   * @param {*} params 参数
   * @param {*} callback 回调函数
   */
  createSQL: (sql, params, callback) => {
    console.log('进入数据库操作');
    console.log('sql语句：', sql);
    //数据库配置信息
    const db = mysqlDB.createConnection(mysqlConfig);
    db.connect();
    db.query(sql, params, callback);
    db.end();
  },

  //异步数据库操作
  createAsyncSQL: (sql, params) => {
    return new Promise((res, rej) => {
      console.log('进入数据库异步操作');
      console.log('sql语句：', sql);
      //数据库配置信息
      const db = mysqlDB.createConnection(mysqlConfig);
      db.connect();
      db.query(sql, params, (err, data) => {
        if (data) res(data);
        else rej(err);
      });
      db.end();
    });
  },

  /**
   *
   * @param {
   * {
   *  sql:string;
   *  params:[];
   * }[]
   * } sqls 查询对象数组
   * 使用事务执行sql语句
   */
  createTransaction: (sqls) => {
    return new Promise((res, rej) => {
      const db = mysqlDB.createPool(mysqlConfig);
      db.getConnection((err, connection) => {
        //数据库连接失败
        if (err) {
          console.log(err);
          return rej(err);
        }

        //开始执行事务
        connection.beginTransaction((beginErr) => {
          if (beginErr) {
            console.log(beginErr);
            return rej(beginErr);
          }

          console.log(`开始执行数据库事务，共执行${sqls.length}条语句`);

          //sql语句封装成Promise数组
          let sqlArr = sqls.map((item) => {
            return new Promise((sqlRes, sqlRej) => {
              connection.query(item.sql, item.params, (err, data) => {
                console.log('sql语句:', item.sql);
                if (data) return sqlRes(data);
                return sqlRej(err);
              });
            });
          });

          Promise.all(sqlArr)
            .then((sqlResult) => {
              //提交事务
              connection.commit((commitErr, info) => {
                if (commitErr) {
                  console.log(`提交事务失败：${commitErr}`);

                  //事务回滚，之前的语句不生效
                  connection.rollback((rollbackErr) => {
                    if (rollbackErr) {
                      console.log(`回滚失败：${rollbackErr}`);
                      connection.release();
                    }
                  });
                  return rej(commitErr);
                }

                connection.release();
                //事务提交成功
                console.log('sql执行成功！');
                res(sqlResult);
              });
            })
            .catch((error) => {
              connection.rollback(() => {
                console.log('sql执行失败' + error);
                connection.release();
                rej(error);
              });
            });
        });
      });
    });
  },
};

module.exports = SQL;
