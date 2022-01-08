const SQL = require('../../utils/sql');
const _ = require('lodash');

const order = {
  /**获取所有订单 */
  handleGetAllOrder: (req, res) => {
    const queryListSql = `
    select \`order\`.*,user.userName,address.address as addressDetail,address.\`name\`,address.phone
    from \`order\`   
    JOIN address on \`order\`.address = address.uid
    JOIN user on \`order\`.userUid = user.uid
    `;

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
};

module.exports = order;
