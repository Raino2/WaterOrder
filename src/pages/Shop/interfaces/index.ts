export type TShop = {
  id: number;
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
  isDisabled: number;
};

export type TShopCar = {
  info: TShop;
  count: number;
};
