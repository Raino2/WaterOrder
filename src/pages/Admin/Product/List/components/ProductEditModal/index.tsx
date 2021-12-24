import { Form, Input, InputNumber, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { TProduct } from '../../interface';

type TProductEditModalProps = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  edit?: TProduct;
};

const ProductEditModal: React.FC<TProductEditModalProps> = (props) => {
  const { visible, onVisibleChange, edit } = props;
  const { Item } = Form;
  return (
    <Modal
      visible={visible}
      onCancel={() => onVisibleChange(false)}
      destroyOnClose
      footer={null}
      title={edit ? '编辑产品' : '添加产品'}
    >
      <Form layout="vertical">
        <Item name="name" label="商品名称">
          <Input defaultValue={edit?.name} />
        </Item>
        <Item name="price" label="价格">
          <InputNumber defaultValue={edit?.price} />
        </Item>
        <Item name="isMPS" label="是否免配送费">
          <Select defaultValue={edit?.isMPS}>
            <Select.Option value={1}>免配送费</Select.Option>
            <Select.Option value={0}>运费自付</Select.Option>
          </Select>
        </Item>
        <Item name="inventory" label="库存">
          <InputNumber defaultValue={edit?.inventory} />
        </Item>
        <Item name="description" label="产品介绍">
          <Input.TextArea rows={4} defaultValue={edit?.description} />
        </Item>
      </Form>
    </Modal>
  );
};

export default ProductEditModal;
