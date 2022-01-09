import { DollarCircleOutlined, PayCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, List, PageHeader, Space } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { TOrder, TOrderProduct } from '../List/interfaces';
import styles from './styles/index.module.scss';

const OrderShowInfo = () => {
  const [order, setOrder] = useState<TOrder>();
  const [orderDetail, setOrderDetail] = useState<TOrderProduct[]>();
  const [loading, setLoading] = useState<boolean>();
  const history = useHistory();
  const orderUid = useParams<{ uuid: string }>().uuid;

  useEffect(() => {
    axios.get(`/admin/order/${orderUid}`).then((res) => {
      setOrder(res.data.data[0]);
    });
  }, []);

  useEffect(() => {
    if (!order) return;
    setLoading(true);
    axios
      .get('/admin/order-detail', {
        params: {
          uid: order?.uid,
        },
      })
      .then((res) => {
        setOrderDetail(res.data.data);
      })
      .finally(() => setLoading(false));
  }, [order]);

  const IconText = (element: { icon: any; text: any }) => (
    <Space>
      {React.createElement(element.icon)}
      {element.text}
    </Space>
  );

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => history.push('/admin/order/show/list')}
        title="订单详情"
        subTitle="信息页卡下方展示本订单所有订购商品信息"
        extra={[
          <Button key="1" type="primary" danger onClick={() => history.push('/shop')}>
            继续选购
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="下单用户">{order?.userName}</Descriptions.Item>
          <Descriptions.Item label="订单ID">{order?.id}</Descriptions.Item>
          <Descriptions.Item label="订单UUID">{order?.uid}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {moment.unix(order?.createAt || 0).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="订单总价">￥{order?.sumPrice}</Descriptions.Item>
          <Descriptions.Item label="地址信息">{order?.address}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Card title="订单详情货物列表" className={styles.card} loading={loading}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{ pageSize: 5 }}
          dataSource={orderDetail}
          renderItem={(item) => (
            <List.Item
              key={item.productUid}
              actions={[
                <IconText
                  icon={PayCircleOutlined}
                  text={`商品单价：￥${item.price}`}
                  key={'product-item-price'}
                />,
                <IconText
                  icon={ShoppingOutlined}
                  text={`购买数量：${item.count}`}
                  key={'product-item-count'}
                />,
                <IconText
                  icon={DollarCircleOutlined}
                  text={`购买总价：￥${item.sumPrice}`}
                  key={'product-item-sumPrice'}
                />,
              ]}
              extra={
                <img
                  src={`http://localhost:8888/${item.img}`}
                  alt="暂无商品图片信息"
                  width={240}
                  height={100}
                />
              }
            >
              <List.Item.Meta title={item.name} description={item.description} />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default OrderShowInfo;
