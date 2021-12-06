import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Switch,
} from 'antd';
import axios from 'axios';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { authStore } from '../../store/AuthStore/authStore';
import { shopStore } from '../../store/ShopStore/shopStore';
import ShopCarDetailCard from '../Shop/components/ShopCarDetailCard';
import { TAdress } from './interface';
import styles from './styles/index.module.scss';

const AuctionPage: React.FC = () => {
  const [adressList, setAdressList] = useState<TAdress[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [adress, setAdress] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/shop/adress`, {
        params: {
          uid: authStore.user.uid,
        },
      })
      .then((res) => {
        setAdressList(res.data.data);
      })
      .catch((res) => {
        setAdressList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    adressList.forEach((item) => {
      if (item.isCommon) setAdress(item.uid);
    });
    adressList.sort((a, b) => {
      return (b.isCommon as number) - (a.isCommon as number);
    });
  }, [adressList]);
  const handleOnAdressRadioChange = (event: RadioChangeEvent) => {
    setAdress(event.target.value);
  };

  const handleChangeCommonAdress = (uid: string, index: number) => {
    axios
      .put(`/shop/adress/common`, {
        uid,
        userUid: authStore.user.uid,
      })
      .then((res) => {
        message.success(res.data.msg);
        let adressListCopy = adressList.slice();
        adressListCopy.forEach((item, idx) => {
          if (item.isCommon === 1) adressListCopy[idx].isCommon = 0;
        });
        adressListCopy[index].isCommon = 1;
        setAdressList(adressListCopy);
      })
      .catch((err) => {
        console.log(err);

        message.error('默认地址修改失败');
      });
  };

  const handleAddNewAdress = (formValue: TAdress) => {
    if (formValue.isCommon === undefined) formValue.isCommon = false;
    axios
      .post('/shop/adress', {
        ...formValue,
        userUid: authStore.user.uid,
      })
      .then((res) => {
        console.log(res.data);
        if (!formValue.isCommon) {
          const adressListCopy = [res.data.data, ...adressList];
          setAdressList(adressListCopy);
        } else {
          let adressListCopy = [res.data.data, ...adressList];
          adressListCopy.forEach((item) => {
            if (item.isCommon == 1 && item.uid !== res.data.data.uid) {
              item.isCommon = 0;
            }
          });
          setAdressList(adressListCopy);
        }
        message.success('添加地址成功');
      })
      .finally(() => {
        setModalVisible(false);
      });
  };

  const renderCardTitle = () => {
    return (
      <div className={styles.cardTitle}>
        {/* <div className={styles.titleIcon}></div> */}
        <div>商品结算</div>
      </div>
    );
  };

  const renderSecondaryTitle = (title: string) => {
    return (
      <div className={styles.secondaryCardTitle}>
        <div className={styles.titleIcon}></div>
        <div>{title}</div>
      </div>
    );
  };

  const renderAdressList = () => {
    if (adressList.length === 0) return <div>暂无地址信息</div>;
    return (
      <div>
        <Radio.Group onChange={handleOnAdressRadioChange} value={adress}>
          <Space direction="vertical">
            {adressList.map((item, index) => {
              return (
                <Radio value={item.uid} style={{ fontSize: 18 }} key={index}>
                  <Space size="middle">
                    <span>{item.adress}</span>
                    <strong>({item.name} 收)</strong>
                    <span>{item.phone}</span>
                    {item.isCommon == 1 && <div style={{ color: 'blue' }}>[默认地址]</div>}
                    {!item.isCommon && (
                      <div
                        className={styles.setCommon}
                        onClick={() => {
                          handleChangeCommonAdress(item.uid!, index);
                        }}
                      >
                        设为默认地址
                      </div>
                    )}
                  </Space>
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.board}>
        <Card title={renderCardTitle()} className={styles.card}>
          <div className={styles.content}>
            {renderSecondaryTitle('确认商品订单信息')}
            <Card style={{ overflow: 'auto', height: 600 }}>
              {shopStore.shopList.length === 0 && <div>暂无订单信息</div>}
              {shopStore.shopList.map((item) => {
                const props = {
                  imgUrl: item.info.img,
                  title: item.info.name,
                  price: item.info.price,
                  inventory: item.info.inventory,
                  count: item.count,
                };
                return <ShopCarDetailCard {...props} />;
              })}
            </Card>
            <Space className={styles.choseAdress} direction="horizontal" size="middle">
              {renderSecondaryTitle('选择收货地址')}
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                添加新地址
              </Button>
            </Space>
            <Card loading={loading}>{renderAdressList()}</Card>
          </div>
        </Card>
      </div>
      <div className={styles.auction}>结算面板测试测试测试</div>
      <Modal
        title="添加新地址"
        visible={modalVisible}
        centered
        footer={null}
        destroyOnClose
        onCancel={() => setModalVisible(false)}
      >
        <Form wrapperCol={{ span: 24 }} onFinish={handleAddNewAdress}>
          <Form.Item label="设置默认地址" name="isCommon">
            <Switch checkedChildren="默认" unCheckedChildren="不默认" />
          </Form.Item>
          <Row gutter={[12, 24]}>
            <Col span={10}>
              <Form.Item
                label="收件人"
                name="name"
                wrapperCol={{ offset: 1 }}
                rules={[{ required: true, message: '收件人不能为空' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="手机号"
                name="phone"
                rules={[{ required: true, message: '手机号不能为空' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="地址"
            name="adress"
            wrapperCol={{ offset: 1 }}
            rules={[{ required: true, message: '地址信息不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Row gutter={[12, 24]}>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  htmlType="button"
                  onClick={() => {
                    setModalVisible(false);
                  }}
                >
                  取消
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default observer(AuctionPage);
