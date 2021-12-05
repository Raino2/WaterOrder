import { action, observable } from 'mobx';
import { TShopCar } from '../../pages/Shop/interfaces';

class ShopStore {
  @observable shopList: TShopCar[] = [];

  @action setShopList = (shop: TShopCar[]) => {
    this.shopList = shop;
  };
}

export const shopStore = new ShopStore();
export default ShopStore;
