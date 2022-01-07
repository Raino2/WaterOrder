const ORDER_STATUS = {
  UNDISPATCH: 0, //未派发
  DISPATCH: 1, //已派发
  UNDELIVERED: 2, //未配送
  DELIVERED: 3, //已配送
  END: 4, //已完结
};

module.exports = {
  ORDER_STATUS,
};
