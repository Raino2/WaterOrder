import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, message, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { TRegion } from './interfaces';

const RegionShowList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [regionList, setRegionList] = useState<TRegion[]>();
  const [regionEdit, setEdit] = useState<TRegion>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    handleFetchRegion();
  }, []);

  const handleFetchRegion = () => {
    setLoading(true);
    axios
      .get('/admin/region')
      .then((res) => {
        setRegionList(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreateRegion = () => {
    setEdit(undefined);
    setVisible(true);
  };

  const handleSubmit = (data: TRegion) => {
    axios[regionEdit ? 'put' : 'post'](`/admin/region`, {
      uid: regionEdit?.uid,
      ...pick(data, ['regionId', 'regionName']),
    })
      .then(() => {
        message.success(regionEdit ? '编辑成功' : '新增成功');
        handleFetchRegion();
        handleCloseModal();
      })
      .catch((err) => {
        message.error(regionEdit ? '编辑失败' : '新增失败');
      });
  };

  const handleDeleteRegion = (uid: string) => {
    Modal.confirm({
      title: '删除警告',
      content: '确定删除该地区信息？',
      okText: '删除',
      cancelText: '取消',
      okButtonProps: {
        type: 'primary',
        danger: true,
      },
      onOk: () => {
        axios
          .delete('/admin/region', {
            params: {
              uid,
            },
          })
          .then(() => {
            message.success('删除成功');
            handleFetchRegion();
          })
          .catch(() => {
            message.error('删除失败');
          });
      },
    });
  };

  const handleModifyRegion = (data: TRegion) => {
    setEdit(data);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setEdit(undefined);
  };

  const colunm: ColumnsType<TRegion> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: 'uid',
      dataIndex: 'uid',
      width: 350,
      ellipsis: true,
    },
    {
      title: '地区ID',
      dataIndex: 'regionId',
      width: 150,
    },
    {
      title: '地区名称',
      dataIndex: 'regionName',
      width: 500,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      align: 'right',
      render: (_, data) => {
        return (
          <Space>
            <a onClick={() => handleModifyRegion(data)}>编辑</a>
            <a onClick={() => handleDeleteRegion(data.uid)}>删除</a>
          </Space>
        );
      },
    },
  ];

  const { Item } = Form;

  return (
    <PageContainer>
      <Card loading={loading}>
        <div style={{ display: 'flex', justifyContent: 'right', marginBottom: 24 }}>
          <Button type="primary" onClick={handleCreateRegion} danger>
            新增地区
          </Button>
        </div>
        <Table dataSource={regionList} columns={colunm} />
      </Card>
      <Modal
        title={regionEdit ? '编辑地区信息' : '新增地区'}
        visible={visible}
        footer={null}
        onCancel={handleCloseModal}
        destroyOnClose
      >
        <Form onFinish={handleSubmit} initialValues={regionEdit}>
          <Item
            name="regionId"
            label="地区ID"
            rules={[{ required: true, message: '请输入地区ID' }]}
          >
            <Input defaultValue={regionEdit?.regionId} />
          </Item>
          <Item
            name="regionName"
            label="地区名称"
            rules={[{ required: true, message: '请输入地区名称' }]}
          >
            <Input defaultValue={regionEdit?.regionName} />
          </Item>
          <Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={handleCloseModal}>取消</Button>
            </Space>
          </Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default RegionShowList;
