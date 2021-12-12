import { Button, message, Space } from 'antd';
import React from 'react';
import styles from './styles/index.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { TShop } from '../../interfaces';
import { useHistory } from 'react-router';
import { shopStore } from '../../../../store/ShopStore/shopStore';

type TProps = {
  info: TShop;
  onAdd: (uid: string) => void;
};

const CommodityCard: React.FC<TProps> = (props) => {
  const { uid, name, price, img } = props.info;
  const history = useHistory();

  const handleGoAuction = () => {
    shopStore.setShopList([
      {
        info: props.info,
        count: 1,
      },
    ]);
    history.push('/auction');
  };

  return (
    <div className={styles.card}>
      <div className={styles.shopImg}>
        <img src={img} alt="暂无图片信息" width="100%" height="100%" />
      </div>
      <div>
        <div className={styles.shopTitle}>
          <a>{name}</a>
        </div>
        <div className={styles.toolbarBottom}>
          <div className={styles.price}>
            价格：<span style={{ fontSize: 26 }}>￥{price}</span>
          </div>
          <Space className={styles.buyToolbar}>
            <Button type="primary" danger onClick={handleGoAuction}>
              立即订水
            </Button>
            <div style={{ fontSize: 50, color: 'orangered' }}>
              <ShoppingCartOutlined
                onClick={() => {
                  props.onAdd(uid);
                  message.success('加入购物车成功');
                }}
              />
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default CommodityCard;
