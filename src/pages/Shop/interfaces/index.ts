export type TShop = {
  uid: string;
  name: string;
  price: number;
  isMPS: boolean;
  img: string;
  inventory: number;
  description: string;
  like: number;
  rate: number;
  rateCount: number;
};

export type TShopCar = {
  info: TShop;
  count: number;
};
