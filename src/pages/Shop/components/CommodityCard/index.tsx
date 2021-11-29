import { Button, message, Space } from 'antd';
import React from 'react';
import styles from './styles/index.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';

const CommodityCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.shopImg}>图片</div>
      <div>
        <div className={styles.shopTitle}>
          <a>22元购17L雀巢优活包装饮用水</a>
        </div>
        <div className={styles.toolbarBottom}>
          <div className={styles.price}>
            价格：<span>￥52.00</span>
          </div>
          <Space className={styles.buyToolbar}>
            <Button type="primary" danger>
              立即购买
            </Button>
            <div style={{ fontSize: 50, color: 'orangered' }}>
              <ShoppingCartOutlined onClick={() => message.success('加入购物车成功')} />
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default CommodityCard;
