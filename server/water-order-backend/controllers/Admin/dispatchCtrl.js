const SQL = require('../../utils/sql');
const UUID = require('../../utils/uuid');

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
};

module.exports = dispatch;
