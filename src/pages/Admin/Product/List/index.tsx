import { PageContainer } from '@ant-design/pro-layout';
import { Card, Rate, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TProduct } from './interface';

const ProductList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setList] = useState<TProduct[]>();

  useEffect(() => {
    console.log('触发请求');

    setLoading(true);
    axios
      .get('/admin')
      .then((res) => {
        setList(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const colums: ColumnsType<TProduct> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '是否免配送',
      dataIndex: 'isMPS',
    },
    {
      title: '预览图',
      dataIndex: 'img',
      key: 'img',
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
    },
    {
      title: '产品介绍',
      dataIndex: 'description',
    },
    {
      title: '评分',
      dataIndex: 'rate',
      render: (rate) => {
        return <Rate defaultValue={rate} disabled />;
      },
    },
    {
      title: '是否上架',
      dataIndex: 'isDisabled',
      render: (status) => {
        if (status) return '下架中';
        return '正在上架';
      },
    },
  ];

  return (
    <PageContainer>
      <Card loading={loading}>
        <Table columns={colums} dataSource={productList} rowKey={'id'} />
      </Card>
    </PageContainer>
  );
};

export default ProductList;
