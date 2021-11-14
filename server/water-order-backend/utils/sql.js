const mysqlDB = require('mysql');

//数据库配置信息
const db = mysqlDB.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'raino123',
  database: 'water_order',
});

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

    db.connect();
    db.query(sql, params, callback);
    db.end();
  },
};

module.exports = SQL;
