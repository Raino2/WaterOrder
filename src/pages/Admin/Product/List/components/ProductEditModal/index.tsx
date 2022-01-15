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
          message.success('图片上传成功');
        })
        .catch(() => {
          message.error('图片上传失败');
        });
    }

    axios[edit ? 'put' : 'post'](
      '/admin/product',
      edit ? { ...valueCopy, uid: edit.uid } : valueCopy
    )
      .then((res) => {
        message.success(edit ? '编辑成功' : '添加成功');
        formRef.resetFields();
        onVisibleChange();
        onFresh?.();
      })
      .catch(() => {
        message.error(edit ? '编辑失败' : '添加失败');
      });
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => onVisibleChange()}
      footer={null}
      title={edit ? '编辑产品' : '添加产品'}
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
        <Item name="isDisabled" label="是否下架" required valuePropName="defaultChecked">
          <Switch checkedChildren="下架" unCheckedChildren="上架" />
        </Item>
        <Item name="name" label="商品名称" rules={[{ required: true, message: '请输入商品名称' }]}>
          <Input />
        </Item>
        <Item name="isMPS" label="是否免配送费" required valuePropName="defaultValue">
          <Select>
            <Select.Option value={1}>免配送费</Select.Option>
            <Select.Option value={0}>运费自付</Select.Option>
          </Select>
        </Item>
        <Item
          name="price"
          label="价格"
          rules={[
            { required: true, message: '请输入价格' },
            {
              type: 'number',
              min: 0,
              message: '价格不能低于0',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Item>
        <Item name="inventory" label="库存" rules={[{ required: true, message: '请输入库存' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Item>
        <Item name="img" label="预览图" valuePropName="defaultFileList">
          <Upload action={'/upload/temp'} maxCount={1} listType="picture-card">
            <UploadOutlined />
            <div className="ant-upload-text">上传预览图</div>
          </Upload>
        </Item>
        <Item name="description" label="产品介绍">
          <Input.TextArea rows={4} />
        </Item>
        <Item>
          <Space>
            <Button htmlType="button">取消</Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Space>
        </Item>
      </Form>
    </Modal>
  );
};

export default ProductEditModal;
