import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, Card, Rate, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductEditModal from './components/ProductEditModal';
import { TProduct } from './interface';
import styles from './styles/index.module.scss';

type TProductInfo = {
  sum?: number;
  open?: number;
  close?: number;
};

const ProductList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setList] = useState<TProduct[]>();
  const [productInfo, setInfo] = useState<TProductInfo>();
  const [edit, setEdit] = useState<TProduct>();
  const [visible, setVisible] = useState<boolean>(false);

  const colums: ColumnsType<TProduct> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 80,
    },
    {
      title: '是否免配送费',
      dataIndex: 'isMPS',
      render: (status) => {
        if (status) return <Tag color="green">免配送费</Tag>;
        return <Tag color="red">运费自付</Tag>;
      },
      width: 80,
    },
    {
      title: '预览图',
      dataIndex: 'img',
      key: 'img',
      width: 100,
      render: (_, data) => {
        return (
          <div>
            <img
              src={`http://localhost:8888/${data.img}`}
              alt="暂无图片信息"
              width={100}
              height={100}
            />
          </div>
        );
      },
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      width: 80,
    },
    {
      title: '产品介绍',
      dataIndex: 'description',
      width: 350,
    },
    {
      title: '用户评分',
      dataIndex: 'rate',
      render: (rate) => {
        return <Rate defaultValue={rate} disabled />;
      },
      width: 150,
    },
    {
      title: '是否上架',
      dataIndex: 'isDisabled',
      render: (status) => {
        if (status) return <Tag color="red">下架中</Tag>;
        return <Tag color="green">正在上架</Tag>;
      },
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, data) => {
        return (
          <Button type="link" onClick={() => handleModify(data)}>
            编辑
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get('/admin')
      .then((res) => {
        setList(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let sum = productList?.length;
    let open = productList?.filter((item) => {
      return item.isDisabled === 0;
    }).length;
    let close = productList?.filter((item) => {
      return item.isDisabled === 1;
    }).length;
    setInfo({ sum, open, close });
  }, [productList]);

  const handleModify = (data?: TProduct) => {
    console.log(data);

    setEdit(data);
    setVisible(true);
  };

  /** 刷新数据 **/
  const handleRefrash = () => {
    setLoading(true);
    axios
      .get('/admin')
      .then((res) => {
        setList(res.data.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <PageContainer>
      <Card loading={loading}>
        <div className={styles.toolbar}>
          <Space style={{ marginBottom: 24 }}>
            <Alert message={`共计商品：${productInfo?.sum}`} type="info" />
            <Alert message={`上架商品：${productInfo?.open}`} type="success" showIcon />
            <Alert message={`下架商品：${productInfo?.close}`} type="error" showIcon />
          </Space>
          <Button type="primary" danger onClick={() => handleModify(undefined)}>
            添加新产品
          </Button>
        </div>
        <Table columns={colums} dataSource={productList} rowKey={'id'} />
      </Card>
      <ProductEditModal visible={visible} onVisibleChange={setVisible} edit={edit} />
    </PageContainer>
  );
};

export default ProductList;
