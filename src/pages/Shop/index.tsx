import { Col, Row } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import CommodityCard from './components/CommodityCard';
import styles from './styles/index.module.scss';

const ShopPage: React.FC = () => {
  return (
    <Row gutter={[24, 24]} style={{ width: 1200, margin: '0 auto' }}>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
      <Col span={8}>
        <CommodityCard />
      </Col>
    </Row>
  );
};

export default observer(ShopPage);
