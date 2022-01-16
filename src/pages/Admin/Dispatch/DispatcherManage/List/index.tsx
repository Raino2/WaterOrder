import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Table,
  Upload,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import { omit } from 'lodash';
import React, { useEffect, useState } from 'react';
import { TRegion } from '../../../Region/show/List/interfaces';
import { TDispatcher } from './interfaces';
import styles from './styles/index.module.scss';

const DispatcherManageList: React.FC = () => {
  const [dispatchers, setDispatchers] = useState<TDispatcher[]>();
  const [visible, setVisible] = useState<boolean>();
  const [regions, setRegions] = useState<TRegion[]>();
  const [edit, setEdit] = useState<TDispatcher>();
  const [formRef] = useForm<TDispatcher>();

  useEffect(() => {
    handleFetchDispatchers();
  }, []);

  useEffect(() => {
    axios.get('/admin/region').then((res) => {
      setRegions(res.data.data);
    });
  }, []);

  const handleFetchDispatchers = () => {
    axios.get('/admin/dispatch/dispatcher').then((res) => {
      setDispatchers(res.data.data);
    });
  };

  const handleDelete = (uid: string) => {
    Modal.confirm({
      title: '删除',
      content: '确定要删除这个配送员吗？',
      okText: '删除',
      cancelText: '取消',
      okButtonProps: {
        type: 'primary',
        danger: true,
      },
      onOk: () => {
        axios
          .delete('/admin/dispatch/dispatcher', {
            params: {
              uid,
            },
          })
          .then(() => {
            message.success('删除成功');
            handleFetchDispatchers();
          })
          .catch(() => {
            message.error('删除失败');
          });
      },
    });
  };

  const handleSubmit = () => {
    formRef.validateFields().then(async (data) => {
      let currentAvatar = await handleSetAvatar(data.avatar);
      console.log(currentAvatar);

      axios[edit ? 'put' : 'post'](`/admin/dispatch/dispatcher`, {
        ...omit(data, ['avatar']),
        avatar: currentAvatar,
        uid: edit?.uid,
      })
        .then(() => {
          message.success(edit ? '编辑成功' : '新增成功');
          setVisible(false);
          setEdit(undefined);
          formRef.resetFields();
          handleFetchDispatchers();
        })
        .catch(() => {
          message.error(edit ? '编辑失败' : '新增失败');
        });
    });
  };

  const handleModify = (data: TDispatcher) => {
    setEdit(data);

    const img = {
      url: `http://localhost:8888/${data.avatar}`,
      name: data.avatar?.split('/').pop(),
      status: 'done',
      uid: data.uid,
    };
    formRef.setFieldsValue({
      ...omit(data, ['avatar']),
      avatar: data.avatar ? [img] : [],
    });

    setVisible(true);
  };

  const handleSetAvatar = (avatar: any) => {
    if (avatar && avatar.file && avatar.file !== {} && avatar.file.originFileObj) {
      var reader = new FormData();
      reader.append('file', avatar.file.originFileObj);
      return new Promise((resolve, reject) => {
        axios
          .post('/upload/avatar', reader)
          .then((res) => {
            resolve(res.data.data);
          })
          .catch(() => {
            reject();
          });
      });
    } else return null;
  };

  const column: ColumnsType<TDispatcher> = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'uid',
      dataIndex: 'uid',
      ellipsis: true,
    },
    {
      title: '配送员姓名',
      dataIndex: 'name',
    },
    {
      title: '配送员年龄',
      dataIndex: 'age',
    },
    {
      title: '配送员工龄',
      dataIndex: 'workAge',
    },
    {
      title: '配送地区',
      dataIndex: 'regionId',
      render: (id) => {
        return regions?.filter((item) => {
          return item.regionId === id;
        })[0].regionName;
      },
    },
    {
      title: '照片',
      dataIndex: 'avatar',
      render: (url) => {
        if (url)
          return (
            <img src={`http://localhost:8888/${url}`} alt="暂无照片信息" width={100} height={100} />
          );
        return '暂无照片信息';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, data) => {
        return (
          <Space>
            <a onClick={() => handleModify(data)}>编辑</a>
            <a onClick={() => handleDelete(data.uid)}>删除</a>
          </Space>
        );
      },
    },
  ];

  const { Item } = Form;

  return (
    <PageContainer>
      <Card>
        <div className={styles.toolbar}>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
              setEdit(undefined);
            }}
            danger
          >
            新增配送员
          </Button>
        </div>
        <Table columns={column} dataSource={dispatchers} scroll={{ x: 'max-content' }} />
      </Card>
      <Modal
        title={edit ? '编辑配送员' : '新增配送员'}
        visible={visible}
        onCancel={() => {
          formRef.resetFields();
          setVisible(false);
        }}
        onOk={handleSubmit}
        destroyOnClose
      >
        <Form form={formRef}>
          <Item name="name" label="配送员姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input />
          </Item>
          <Item
            name="regionId"
            label="配送地区"
            rules={[{ required: true, message: '请选择配送地区' }]}
          >
            <Select allowClear>
              {regions?.map((item) => {
                return (
                  <Select.Option value={item.regionId} key={item.uid}>
                    {item.regionName}
                  </Select.Option>
                );
              })}
            </Select>
          </Item>
          <Item
            name="age"
            label="配送员年龄"
            rules={[
              { required: true, message: '请输入配送员年龄' },
              {
                type: 'number',
                min: 0,
                message: '年龄不能小于0',
              },
            ]}
          >
            <InputNumber />
          </Item>
          <Item
            name="workAge"
            label="配送员工龄"
            rules={[
              { required: true, message: '请输入配送员工龄' },
              {
                type: 'number',
                min: 0,
                message: '年龄不能小于0',
              },
            ]}
          >
            <InputNumber />
          </Item>

          <Item name="avatar" label="上传头像" valuePropName="defaultFileList">
            <Upload
              action={'/upload/temp'}
              maxCount={1}
              listType="picture-card"
              onPreview={(file) => {
                window.open(`http://localhost:8888/images/temp/${file.name}`);
              }}
            >
              <UploadOutlined />
              <div className="ant-upload-text">上传照片</div>
            </Upload>
          </Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default DispatcherManageList;
