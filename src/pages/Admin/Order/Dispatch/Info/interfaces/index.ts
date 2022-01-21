export type TDispatch = {
  id: number; //id
  uid: string; //uuid
  orderUid: string; //订单uid
  dispatcherUid: string; //配送员uid
  createAt: number; //创建时间
  endAt: number; //完结时间
  regionName: string; //地区名
  regionId: string; //地区Id
  fee: number; //配送费
  status: DISPATCH_STATUS; //配送状态
};

export enum DISPATCH_STATUS {
  UNDISPATCH = 0, //未派发
  DISPATCH = 1, //已派发
  DELIVERING = 2, //配送中
  DONE = 3, //已完成
}

export const DISPATCH_STATUS_MAP: Record<DISPATCH_STATUS, any> = {
  [DISPATCH_STATUS.UNDISPATCH]: { name: '未派发', color: '#F50' },
  [DISPATCH_STATUS.DISPATCH]: { name: '已派发', color: '#2db7f5' },
  [DISPATCH_STATUS.DELIVERING]: { name: '配送中', color: 'rgb(255,229,143)' },
  [DISPATCH_STATUS.DONE]: { name: '已完结', color: '#87d068' },
};
