const SQL = require('../../utils/sql');
const _ = require('lodash');

const order = {
  /**获取订单 */
  handleGetOrder: (req, res) => {
    const uid = req.params.uuid;
    let queryListSql = `
    select \`order\`.*,user.userName,address.address as addressDetail,address.\`name\`,address.phone
    from \`order\`   
    JOIN address on \`order\`.address = address.uid
    JOIN user on \`order\`.userUid = user.uid
    `;

    if (uid) queryListSql += ` WHERE \`order\`.UID = '${uid}'`;
    let currentOrderList;

    SQL.createAsyncSQL(queryListSql, [])
      .then((data) => {
        currentOrderList = data;
        currentOrderList = currentOrderList.map((item) => {
          let addressInfo = `${item.addressDetail} (${item.name} 收) ${item.phone}`;
          return {
            ..._.omit(item, ['address', 'addressDetail', 'name', 'phone']),
            address: addressInfo,
          };
        });
        res.json(200, {
          data: currentOrderList,
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

  /**获取指定订单详情 */
  handleGetOrderDetail: (req, res) => {
    const { uid } = req.query;
    const sql = `
    SELECT O.*,P.name,P.price,P.img,P.description
    FROM ORDER_DETAIL AS O JOIN PRODUCT AS P ON O.productUid = P.uid
    WHERE orderUid = '${uid}'
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
};

module.exports = order;
