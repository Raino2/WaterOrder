export type TUser = {
  id: number;
  uid: string;
  userName: string;
  userPass: string;
  userRealName: string;
  phone: string;
  email: string;
  address: string; //常用地址
};

export type TUserDetail = {
  isAdmin: number | boolean;
  orderCount: number;
  addressCount: number;
  commentCount: number;
  rate: number; //对本产品的评分
};

export type TUserInfo = TUser & TUserDetail;
