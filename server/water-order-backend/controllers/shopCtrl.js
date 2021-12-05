const SQL = require('../utils/sql');

const Shop = {
  getProducts: (req, res) => {
    const sql = `
    SELECT *
    FROM PRODUCT
    `;
    SQL.createSQL(sql, [], (err, data) => {
      res.json(200, {
        data,
        success: true,
      });
    });
  },
};

module.exports = Shop;
