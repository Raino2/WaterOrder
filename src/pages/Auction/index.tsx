import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Button, Card, message, Radio, RadioChangeEvent, Space } from 'antd';
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
      return b.isCommon - a.isCommon;
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
                    {item.isCommon === 1 && <div style={{ color: 'blue' }}>[默认地址]</div>}
                    {!item.isCommon && (
                      <div
                        className={styles.setCommon}
                        onClick={() => {
                          handleChangeCommonAdress(item.uid, index);
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
              <Button type="dashed" icon={<PlusOutlined />}>
                添加新地址
              </Button>
            </Space>
            <Card loading={loading}>{renderAdressList()}</Card>
          </div>
        </Card>
      </div>
      <div className={styles.auction}>结算面板测试测试测试</div>
    </div>
  );
};

export default observer(AuctionPage);
