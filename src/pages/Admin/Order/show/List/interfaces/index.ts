export type TOrder = {
  id: number;
  uid: string;
  createAt: number;
  userUid: number;
  userName: string;
  sumPrice: number;
  count: number;
  address: string;
  dispatcher: string;
  dispatcherName: string;
  dispatcherFee: number;
  status: ORDER_STATUS;
};

export type TOrderDetail = {
  id: number;
  orderUid: string;
  productUid: string;
  count: number;
  sumPrice: number;
};

export enum ORDER_STATUS {
  UNDISPATCH = 0, //未派发
  DISPATCH = 1, //已派发
  DELIVERING = 2, //配送中
  DONE = 3, //已完成
}

export type TStatusList = {
  undispatch: number;
  dispatch: number;
  delivering: number;
  done: number;
};
