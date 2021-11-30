import { Col, Row } from 'antd';
import axios from 'axios';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import CommodityCard from './components/CommodityCard';
import { TShop } from './interfaces';
import styles from './styles/index.module.scss';

const ShopPage: React.FC = () => {
  const [shopList, setShopList] = useState<TShop[]>();

  useEffect(() => {
    //滚动条置顶
    window.scrollTo(0, 0);

    axios.get('/shop').then((res) => {
      setShopList(res.data.data);
    });
  }, []);

  return (
    <Row gutter={[24, 24]} style={{ width: 1200, margin: '0 auto' }}>
      {shopList?.map((item) => {
        return (
          <Col span={8}>
            <CommodityCard {...item} />
          </Col>
        );
      })}
    </Row>
  );
};

export default observer(ShopPage);
