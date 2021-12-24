const SQL = require('../utils/sql');

const admin = {
  /**获取所有产品 */
  getProducts: (req, res) => {
    const sql = `
    SELECT *
    FROM PRODUCT
    `;
    SQL.createSQL(sql, [], (_, data) => {
      res.json(200, {
        data,
        success: true,
      });
    });
  },
};

module.exports = admin;
