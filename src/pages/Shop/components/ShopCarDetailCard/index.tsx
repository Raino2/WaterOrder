import React from 'react';
import styles from './styles/index.module.scss';

type TProps = {
  imgUrl: string;
  title: string;
  price: number;
  inventory: number; //库存
  count: number; //下单数
};

const ShopCarDetailCard: React.FC<TProps> = (props) => {
  const { imgUrl, title, price, inventory, count } = props;

  return (
    <div className={styles.card}>
      <div className={styles.shopImg}>
        <img src={imgUrl} alt="暂无商品图片" width="100%" height="100%" />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.data}>
          <div>
            单价：<strong style={{ color: 'red' }}>{price}</strong>
          </div>
          <div>
            库存：<span>{inventory}</span>
          </div>
          <div className={styles.count}>
            <div>下单数：</div>
            <strong style={{ width: 60, fontSize: 30, color: 'orange' }}>{count}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCarDetailCard;
