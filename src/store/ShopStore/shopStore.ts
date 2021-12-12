import { action, computed, observable } from 'mobx';
import { TShopCar } from '../../pages/Shop/interfaces';

class ShopStore {
  @observable shopList: TShopCar[] = [];

  @computed get shopSumPrice(): number {
    return this.shopList.reduce((now, pre) => {
      return now + pre.info.price * pre.count;
    }, 0);
  }

  @computed get shopCount(): number {
    return Number(
      this.shopList
        .reduce((now, pre) => {
          return now + pre.count;
        }, 0)
        .toFixed(2)
    );
  }

  @action setShopList = (shop: TShopCar[]) => {
    this.shopList = shop;
  };
}

export const shopStore = new ShopStore();
export default ShopStore;
