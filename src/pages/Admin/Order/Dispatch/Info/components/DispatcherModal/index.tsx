import { UserOutlined } from '@ant-design/icons';
import { Avatar, Form, InputNumber, List, Modal } from 'antd';
import axios from 'axios';
import React, { RefObject, useEffect, useImperativeHandle, useState } from 'react';
import { TDispatcher } from '../../../../../Dispatch/DispatcherManage/List/interfaces';
import Scrollbars from 'react-custom-scrollbars';
import styles from './styles/index.module.scss';
import { useForm } from 'antd/es/form/Form';

type TProps = {
  dispatcherModalref?: RefObject<TDispatcherModalRef>;
  onCreate: (value: { dispatcher: TDispatcher; fee: number }) => void;
};

export type TDispatcherModalRef = {
  hide: () => void;
  open: () => void;
};

const DispatcherModal: React.FC<TProps> = (props) => {
  const { dispatcherModalref, onCreate } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [dispatchers, setDispatchers] = useState<TDispatcher[]>([]);
  const [formRef] = useForm<{ fee: number }>();

  useEffect(() => {
    axios.get('/admin/dispatch/dispatcher').then((res) => {
      setDispatchers(res.data.data);
    });
  }, []);

  useImperativeHandle(dispatcherModalref, () => ({
    hide,
    open,
  }));

  const hide = () => {
    setVisible(false);
  };

  const open = () => {
    setVisible(true);
  };

  /**
   * 创建配送单
   */
  const createDispatch = (item: TDispatcher) => {
    formRef.validateFields().then((value) => {
      onCreate({
        dispatcher: item,
        fee: value.fee || 0,
      });
    });
  };

  return (
    <Modal visible={visible} onCancel={hide} title="选择配送人员" width={600} destroyOnClose>
      <div style={{ height: 400, overflow: 'auto' }}>
        <Scrollbars>
          <List
            dataSource={dispatchers}
            renderItem={(item) => (
              <List.Item
                className={styles.list}
                onClick={() => {
                  Modal.confirm({
                    title: '配置配送费',
                    content: (
                      <div>
                        <Form form={formRef}>
                          <Form.Item name="fee" label="配送费" required>
                            <InputNumber />
                          </Form.Item>
                        </Form>
                      </div>
                    ),
                    onOk: () => createDispatch(item),
                  });
                }}
              >
                <List.Item.Meta
                  style={{ padding: '0 12px' }}
                  avatar={
                    item.avatar ? (
                      <Avatar src={`http://localhost:8888/${item.avatar}`} />
                    ) : (
                      <Avatar icon={<UserOutlined />} />
                    )
                  }
                  title={item.name}
                  description={`配送地区：${item.regionId || '暂无指定地区'}  |  年龄：${
                    item.age
                  }岁  |  工龄：${item.workAge}年`}
                ></List.Item.Meta>
              </List.Item>
            )}
          />
        </Scrollbars>
      </div>
    </Modal>
  );
};

export default DispatcherModal;
