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
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { authStore } from '../../store/AuthStore/authStore';
import { shopStore } from '../../store/ShopStore/shopStore';
import ShopCarDetailCard from '../Shop/components/ShopCarDetailCard';
import { TAddress } from './interface';
import styles from './styles/index.module.scss';

const AuctionPage: React.FC = () => {
  const [addressList, setAddressList] = useState<TAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addressInfo, setAddressInfo] = useState<string>();
  const history = useHistory();

  useEffect(() => {
    const newInfo = addressList.filter((item) => {
      return item.uid === address;
    });
    newInfo[0] &&
      setAddressInfo(`${newInfo[0].address} (${newInfo[0].name} 收) ${newInfo[0].phone}`);
  }, [address, addressList]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/shop/address`, {
        params: {
          uid: authStore.user.uid,
        },
      })
      .then((res) => {
        setAddressList(res.data.data);
      })
      .catch((res) => {
        setAddressList([]);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(shopStore.shopSumPrice);
  }, []);

  useEffect(() => {
    addressList.forEach((item) => {
      if (item.isCommon) setAddress(item.uid);
    });
    addressList.sort((a, b) => {
      return (b.isCommon as number) - (a.isCommon as number);
    });
  }, [addressList]);

  const handleOnAddressRadioChange = (event: RadioChangeEvent) => {
    setAddress(event.target.value);
  };

  const handleChangeCommonAddress = (uid: string, index: number) => {
    axios
      .put(`/shop/address/common`, {
        uid,
        userUid: authStore.user.uid,
      })
      .then((res) => {
        message.success(res.data.msg);
        let addressListCopy = addressList.slice();
        addressListCopy.forEach((item, idx) => {
          if (item.isCommon === 1) addressListCopy[idx].isCommon = 0;
        });
        addressListCopy[index].isCommon = 1;
        setAddressList(addressListCopy);
      })
      .catch((err) => {
        console.log(err);

        message.error('默认地址修改失败');
      });
  };

  const handleAddNewaddress = (formValue: TAddress) => {
    if (formValue.isCommon === undefined) formValue.isCommon = false;
    axios
      .post('/shop/address', {
        ...formValue,
        userUid: authStore.user.uid,
      })
      .then((res) => {
        console.log(res.data);
        if (!formValue.isCommon) {
          const addressListCopy = [res.data.data, ...addressList];
          setAddressList(addressListCopy);
        } else {
          let addressListCopy = [res.data.data, ...addressList];
          addressListCopy.forEach((item) => {
            if (item.isCommon == 1 && item.uid !== res.data.data.uid) {
              item.isCommon = 0;
            }
          });
          setAddressList(addressListCopy);
        }
        message.success('添加地址成功');
      })
      .finally(() => {
        setModalVisible(false);
      });
  };

  //结算购物车
  const handleCheckOut = () => {
    const productList = shopStore.shopList.map((item) => {
      return {
        uuid: item.info.uid,
        count: item.count,
        sumPrice: Number((item.count * item.info.price).toFixed(2)),
      };
    });
    const userUid = authStore.user.uid;
    const sumPrice = shopStore.shopSumPrice;
    const count = shopStore.shopCount;
    const createAt = moment().unix();
    Modal.confirm({
      title: '结算订单',
      content: '确定下单？',
      centered: true,
      okText: '立即下单',
      cancelText: '取消',
      onOk: () => {
        axios
          .post('/shop/auction', {
            userUid,
            createAt,
            sumPrice,
            count,
            address,
            productList,
          })
          .then(() => {
            message.success('下单成功');
            history.push('/shop');
          });
      },
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

  const renderaddressList = () => {
    if (addressList.length === 0) return <div>暂无地址信息</div>;
    return (
      <div>
        <Radio.Group onChange={handleOnAddressRadioChange} value={address}>
          <Space direction="vertical">
            {addressList.map((item, index) => {
              return (
                <Radio value={item.uid} style={{ fontSize: 18 }} key={index}>
                  <Space size="middle">
                    <span>{item.address}</span>
                    <strong>({item.name} 收)</strong>
                    <span>{item.phone}</span>
                    {item.isCommon == 1 && <div style={{ color: 'blue' }}>[默认地址]</div>}
                    {!item.isCommon && (
                      <div
                        className={styles.setCommon}
                        onClick={() => {
                          handleChangeCommonAddress(item.uid!, index);
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

  const renderAuctionPanel = () => {
    return (
      <div className={styles.auction}>
        <Row gutter={24}>
          <Col span={3}>
            <div>
              共计 <strong>{shopStore.shopCount}</strong> 件
            </div>
          </Col>
          <Col span={3}>
            合计金额：<strong>{shopStore.shopSumPrice}</strong>
          </Col>
          <Col span={14}>
            地址信息：
            <strong>{addressInfo}</strong>
          </Col>
          <Col span={4}>
            <Button type="primary" danger className={styles.res} onClick={handleCheckOut}>
              立即下单
            </Button>
          </Col>
        </Row>
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
            <Space className={styles.choseAddress} direction="horizontal" size="middle">
              {renderSecondaryTitle('选择收货地址')}
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                添加新地址
              </Button>
            </Space>
            <Card loading={loading}>{renderaddressList()}</Card>
          </div>
        </Card>
      </div>
      {renderAuctionPanel()}
      <Modal
        title="添加新地址"
        visible={modalVisible}
        centered
        footer={null}
        destroyOnClose
        onCancel={() => setModalVisible(false)}
      >
        <Form wrapperCol={{ span: 24 }} onFinish={handleAddNewaddress}>
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
            name="address"
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
