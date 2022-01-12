const SQL = require('../../utils/sql');
const UUID = require('../../utils/uuid');

const region = {
  /** 获取地区 **/
  handleGetRegion: (req, res) => {
    const sql = `
    SELECT *
    FROM REGION
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

  /** 新增地区 **/
  handleCreateRegion: (req, res) => {
    const { regionId, regionName } = req.body;
    const checkSql = `
    SELECT *
    FROM REGION
    WHERE REGIONID = '${regionId}'
    `;

    const sql = `
    INSERT REGION(UID,REGIONID,REGIONNAME)
    VALUES(?,?,?)
    `;
    const uuid = UUID.generateUUID();
    SQL.createAsyncSQL(checkSql, []).then((data) => {
      if (data && data.length) {
        res.json(401, {
          err: '地区Id已存在',
          success: false,
        });
        return;
      }

      SQL.createAsyncSQL(sql, [uuid, regionId, regionName])
        .then(() => {
          res.json(200, {
            data: '创建地区成功',
            success: true,
          });
        })
        .catch(() => {
          res.json(401, {
            err: '创建地区失败',
            success: false,
          });
        });
    });
  },

  /** 修改地区信息 **/
  handleModifyRegion: async (req, res) => {
    const { uid, regionId, regionName } = req.body;
    const checkSql = `
    SELECT *
    FROM REGION
    WHERE REGIONID = '${regionId}' AND UID != '${uid}'
    `;

    let checkData = await SQL.createAsyncSQL(checkSql, []);
    if (checkData && checkData.length) {
      res.json(401, {
        err: '修改失败，地区ID已存在',
        success: false,
      });
      return;
    }

    const sql = `
    UPDATE REGION
    SET REGIONID = ?,REGIONNAME = ?
    WHERE UID = ?
    `;

    SQL.createAsyncSQL(sql, [regionId, regionName, uid])
      .then(() => {
        res.json(200, {
          data: '修改成功',
          success: true,
        });
      })
      .catch(() => {
        res.json(401, {
          err: '修改失败',
          success: false,
        });
      });
  },

  /** 删除地区信息 **/
  handleDeleteRegion: (req, res) => {
    const { uid } = req.query;
    const sql = `
    DELETE 
    FROM REGION
    WHERE UID = '${uid}'
    `;

    SQL.createAsyncSQL(sql, [])
      .then(() => {
        res.json(200, {
          data: '删除成功',
          success: true,
        });
      })
      .catch(() => {
        res.json(401, {
          err: '删除失败',
          success: false,
        });
      });
  },
};

module.exports = region;
