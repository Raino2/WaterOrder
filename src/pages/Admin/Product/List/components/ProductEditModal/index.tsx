import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Select, Space, Switch, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { omit } from 'lodash';
import React, { useEffect } from 'react';
import { TProduct } from '../../interface';

type TProductEditModalProps = {
  visible: boolean;
  onVisibleChange: () => void;
  edit?: TProduct;
  onFresh?: () => void;
};

const ProductEditModal: React.FC<TProductEditModalProps> = (props) => {
  const { visible, onVisibleChange, edit, onFresh } = props;
  const { Item } = Form;
  const [formRef] = useForm<TProduct>();

  useEffect(() => {
    if (!edit) {
      formRef.resetFields();
      formRef.setFieldsValue({ ...omit(edit, ['isDisabled']), isDisabled: false });
      return;
    }
    let editCopy = { ...edit };
    if (edit.img)
      editCopy = {
        ...omit(editCopy, ['img']),
        img: [
          {
            url: `http://localhost:8888/${edit.img}`,
            name: 'test',
            status: 'done',
            uid: edit.uid,
          },
        ],
      };

    editCopy?.isDisabled
      ? formRef.setFieldsValue({ ...omit(editCopy, ['isDisabled']), isDisabled: true })
      : formRef.setFieldsValue({ ...omit(editCopy, ['isDisabled']), isDisabled: false });
  }, [edit]);

  const handleSubmit = (values: TProduct) => {
    let valueCopy = values.img
      ? {
          ...omit(values, ['img']),
          img:
            values.img instanceof Array
              ? { file: { name: values.img[0].url.split('/').pop() } }
              : { file: { ...values.img.file } },
        }
      : { ...values };

    if (values.img && values.img.file && values.img.file !== {} && values.img.file.originFileObj) {
      var reader = new FormData();
      reader.append('file', values.img.file.originFileObj);
      axios
        .post('/admin/product/upload-img', reader)
        .then(() => {
          message.success('??????????????????');
        })
        .catch(() => {
          message.error('??????????????????');
        });
    }

    axios[edit ? 'put' : 'post'](
      '/admin/product',
      edit ? { ...valueCopy, uid: edit.uid } : valueCopy
    )
      .then((res) => {
        message.success(edit ? '????????????' : '????????????');
        formRef.resetFields();
        onVisibleChange();
        onFresh?.();
      })
      .catch(() => {
        message.error(edit ? '????????????' : '????????????');
      });
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => onVisibleChange()}
      footer={null}
      title={edit ? '????????????' : '????????????'}
      destroyOnClose
    >
      <Form
        form={formRef}
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
          handleSubmit(values);
        }}
      >
        <Item name="isDisabled" label="????????????" required valuePropName="defaultChecked">
          <Switch checkedChildren="??????" unCheckedChildren="??????" />
        </Item>
        <Item name="name" label="????????????" rules={[{ required: true, message: '?????????????????????' }]}>
          <Input />
        </Item>
        <Item name="isMPS" label="??????????????????" required valuePropName="defaultValue">
          <Select>
            <Select.Option value={1}>????????????</Select.Option>
            <Select.Option value={0}>????????????</Select.Option>
          </Select>
        </Item>
        <Item
          name="price"
          label="??????"
          rules={[
            { required: true, message: '???????????????' },
            {
              type: 'number',
              min: 0,
              message: '??????????????????0',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Item>
        <Item name="inventory" label="??????" rules={[{ required: true, message: '???????????????' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Item>
        <Item name="img" label="?????????" valuePropName="defaultFileList">
          <Upload action={'/upload/temp'} maxCount={1} listType="picture-card">
            <UploadOutlined />
            <div className="ant-upload-text">???????????????</div>
          </Upload>
        </Item>
        <Item name="description" label="????????????">
          <Input.TextArea rows={4} />
        </Item>
        <Item>
          <Space>
            <Button htmlType="button">??????</Button>
            <Button type="primary" htmlType="submit">
              ??????
            </Button>
          </Space>
        </Item>
      </Form>
    </Modal>
  );
};

export default ProductEditModal;
