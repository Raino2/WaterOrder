/* eslint-disable jsx-a11y/anchor-is-valid */
import { MehTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ORDER_STATUS, TOrder, TStatusList } from './interfaces';
import styles from './styles/index.module.scss';

const OrderShowList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>();
  const [orderList, setOrderList] = useState<TOrder[]>();
  const [statusList, setStatusList] = useState<TStatusList>();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios
      .get('/admin/order')
      .then((res) => {
        setOrderList(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let undispatch: number = 0;
    let dispatch: number = 0;
    let delivering: number = 0;
    let done: number = 0;
    if (!orderList || !orderList.length) return;

    orderList.forEach((item) => {
      if (item.status === ORDER_STATUS.UNDISPATCH) undispatch++;
      if (item.status === ORDER_STATUS.DISPATCH) dispatch++;
      if (item.status === ORDER_STATUS.DELIVERING) delivering++;
      if (item.status === ORDER_STATUS.DONE) done++;
      setStatusList({
        undispatch,
        dispatch,
        delivering,
        done,
      });
    });
  }, [orderList]);

  const columns: ColumnsType<TOrder> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 50,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        return b.id - a.id;
      },
    },
    {
      title: 'uid',
      dataIndex: 'uid',
      ellipsis: true,
      width: 200,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => {
        if (status === ORDER_STATUS.UNDISPATCH) return <Tag color="red">未派发</Tag>;
        if (status === ORDER_STATUS.DISPATCH) return <Tag color="blue">已派发</Tag>;
        if (status === ORDER_STATUS.DELIVERING) return <Tag color="gold">配送中</Tag>;
        return <Tag color="green">已完成</Tag>;
      },
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      width: 120,
    },
    {
      title: '地址信息',
      dataIndex: 'address',
      width: 300,
    },
    {
      title: '订单总额',
      dataIndex: 'sumPrice',
      width: 100,
      render: (price) => {
        return price.toFixed(2);
      },
    },
    {
      title: '货物数量',
      dataIndex: 'count',
      width: 100,
    },
    {
      title: '下单时间',
      dataIndex: 'createAt',
      width: 150,
      render: (time) => {
        return moment.unix(time).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '配送员',
      dataIndex: 'dispatcher',
      render: (peo) => {
        if (!peo)
          return (
            <Space>
              <MehTwoTone twoToneColor="red" />
              暂无配送人员
            </Space>
          );
        return peo;
      },
    },
    {
      title: '配送费',
      dataIndex: 'dispatcherFee',
      width: 150,
      render: (fee) => {
        if (!fee)
          return (
            <Space>
              <MehTwoTone twoToneColor="red" />
              暂无配送信息
            </Space>
          );
        return fee;
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, data) => {
        return (
          <Space direction="vertical">
            <a
              onClick={() => {
                history.push(`/admin/order/dispatch/info/${data.uid}`);
              }}
            >
              订单派发
            </a>
            <a
              onClick={() => {
                history.push(`/admin/order/show/info/${data.uid}`);
              }}
            >
              查看详情
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card loading={loading}>
        <div className={styles.toolbar}>
          <Space size="middle">
            <Alert message={`未派发的订单数：${statusList?.undispatch}`} type="error" />
            <Alert message={`已派发的订单数：${statusList?.dispatch}`} type="info" />
            <Alert message={`配送中的订单数：${statusList?.delivering}`} type="warning" />
            <Alert message={`已完成的订单数：${statusList?.done}`} type="success" />
          </Space>
        </div>
        <Table columns={columns} dataSource={orderList} rowKey={(row) => row.uid} />
      </Card>
    </PageContainer>
  );
};

export default OrderShowList;
