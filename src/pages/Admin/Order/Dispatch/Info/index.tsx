/* eslint-disable react/jsx-no-target-blank */
import { ToolOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Empty, message, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/index.module.scss';
import defaultAvatar from '../../../../../assets/images/default_avatar.png';
import { DISPATCH_STATUS, DISPATCH_STATUS_MAP, TDispatch } from './interfaces';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { TOrder } from '../../show/List/interfaces';
import { TAddress } from '../../../../Auction/interface';
import { TDispatcher } from '../../../Dispatch/DispatcherManage/List/interfaces';
import moment from 'moment';
import DispatcherModal, { TDispatcherModalRef } from './components/DispatcherModal';

const OrderDispatchInfo: React.FC = () => {
  const [loading, setLoading] = useState<boolean>();
  const [dispatchInfo, setInfo] = useState<TDispatch>();
  const [dispatcherInfo, setDispatcherInfo] = useState<TDispatcher>();
  const [orderInfo, setOrderInfo] = useState<Omit<TOrder, 'address'> & Omit<TAddress, 'uid'>>();
  const [addressInfo, setAddressInfo] = useState<TAddress>();
  const [uid, setUid] = useState<string>();
  const modalRef = useRef<TDispatcherModalRef>(null);
  const orderUid = useParams<{ uuid: string }>().uuid;
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!dispatchInfo) return;
    axios
      .get('/admin/dispatch/order', {
        params: {
          uid: dispatchInfo.orderUid,
        },
      })
      .then((res) => {
        setOrderInfo(res.data.data);
        const addressUid = res.data.data.address;

        axios
          .get('/admin/dispatch/dispatcher/detail', {
            params: {
              uid: dispatchInfo?.dispatcherUid,
            },
          })
          .then((res) => {
            setDispatcherInfo(res.data.data[0]);
          });

        axios
          .get('/admin/dispatch/address', {
            params: {
              uid: addressUid,
            },
          })
          .then((res) => {
            setAddressInfo(res.data.data);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, [dispatchInfo]);

  const init = () => {
    setLoading(true);
    axios
      .get('/admin/dispatch/info', {
        params: {
          orderUid,
        },
      })
      .then((res) => {
        setUid(res.data.data.uid);
        setInfo(res.data.data);
      })
      .catch((err) => {
        message.error('???????????????????????????');
        setLoading(false);
      });
  };

  const handleStartDispatch = () => {
    setLoading(true);
    const hide = message.loading('????????????...');
    axios
      .post('/admin/dispatch/start', {
        uid: orderUid,
      })
      .then(() => {
        hide();
        message.success('?????????????????????');
      })
      .catch(() => {
        hide();
        message.error('???????????????????????????');
      })
      .finally(() => {
        init();
        setTimeout(() => setLoading(false), 1000);
      });
  };

  const handleEndDispatch = () => {
    setLoading(true);
    const hide = message.loading('????????????...');
    axios
      .post('/admin/dispatch/end', {
        uid: orderUid,
        endAt: moment().unix(),
      })
      .then(() => {
        hide();
        message.success('???????????????');
      })
      .catch(() => {
        hide();
        message.error('???????????????????????????');
      })
      .finally(() => {
        init();
        setTimeout(() => setLoading(false), 1000);
      });
  };

  const createDispatch = (value: { dispatcher: TDispatcher; fee: number }) => {
    axios
      .post(`/admin/dispatch`, {
        orderUid: orderUid,
        dispatcherUid: value.dispatcher.uid,
        createAt: moment().unix(),
        regionId: value.dispatcher.regionId,
        fee: value.fee,
      })
      .then(() => {
        message.success('????????????????????????');
        modalRef.current?.hide();
        init();
      })
      .catch(() => {
        message.error('?????????????????????');
      });
  };

  const renderOrderInfo = () => {
    if (!dispatchInfo) {
      return (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>?????????????????????????????????</span>}
        >
          <Button
            type="primary"
            icon={<ToolOutlined />}
            style={{ fontSize: 24, height: 60 }}
            danger
            onClick={() => modalRef.current?.open()}
          >
            ?????????????????????
          </Button>
        </Empty>
      );
    }
    return (
      <>
        <div className={styles.infoTitle}>?????????????????????</div>
        <div className={styles.dispatchInfo}>
          <div>
            ???????????????
            <Tag color={DISPATCH_STATUS_MAP[dispatchInfo.status].color}>
              {DISPATCH_STATUS_MAP[dispatchInfo.status].name}
            </Tag>
          </div>
          {dispatchInfo.status === DISPATCH_STATUS.DONE ? (
            <div>???????????????{moment.unix(dispatchInfo.endAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          ) : (
            <div>???????????????{moment.unix(dispatchInfo.createAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          )}
          <div>???????????????{addressInfo?.address}</div>
          <div>???????????????{addressInfo?.name}</div>
          <div>???????????????{addressInfo?.phone}</div>
          <div>
            ???????????????
            <a href={`/admin/order/show/info/${orderInfo?.uid}`} target="_blank">
              ????????????????????????
            </a>
          </div>
          <div>???????????????{dispatchInfo.regionName}</div>
          <div>???????????????{dispatchInfo.regionId}</div>
          <div>??????????????????{orderInfo?.sumPrice}</div>
          <div>???????????????{dispatchInfo.fee}</div>
        </div>
        <div className={styles.status}>{renderStatusButton()}</div>
      </>
    );
  };

  const renderStatusButton = () => {
    if (!dispatchInfo || !dispatchInfo.status) return null;
    switch (dispatchInfo.status) {
      case DISPATCH_STATUS.DISPATCH:
        return (
          <Button
            type="primary"
            style={{ fontSize: 24, height: 50 }}
            onClick={handleStartDispatch}
            danger
            block
          >
            ????????????
          </Button>
        );
      case DISPATCH_STATUS.DELIVERING:
        return (
          <Button
            type="primary"
            style={{ fontSize: 24, height: 50 }}
            onClick={handleEndDispatch}
            danger
            block
          >
            ????????????
          </Button>
        );
      case DISPATCH_STATUS.DONE:
        return (
          <Button type="primary" style={{ fontSize: 24, height: 50 }} danger disabled block>
            ???????????????
          </Button>
        );
    }
  };

  const renderDispatcherInfo = () => {
    if (!dispatchInfo) {
      return <div>????????????????????????</div>;
    }
    return (
      <>
        <div>??????????????????{dispatcherInfo?.name}</div>
        <div>??????????????????{dispatcherInfo?.age}</div>
        <div>??????????????????{dispatcherInfo?.workAge}</div>
        <div className={styles.region}>????????????Id???{dispatcherInfo?.regionId}</div>
      </>
    );
  };

  return (
    <div className={styles.body}>
      <Card
        loading={loading}
        className={styles.card}
        title={
          <div style={{ color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
            <span>????????????{orderUid}</span>
            <Button type="dashed" danger onClick={() => history.push('/admin/order/show/list')}>
              ???????????????
            </Button>
          </div>
        }
      >
        <div className={styles.cardBody}>
          <div className={styles.left}>
            <section className={styles.pic}>
              <Avatar
                style={{ backgroundColor: 'rgb(219,219,219)', width: '100%', height: '100%' }}
                icon={<UserOutlined style={{ fontSize: 400 }} />}
                shape="square"
                src={
                  dispatcherInfo?.avatar
                    ? `http://localhost:8888/${dispatcherInfo?.avatar}`
                    : defaultAvatar
                }
              />
            </section>
            <section className={styles.description}>{renderDispatcherInfo()}</section>
          </div>
          <div className={styles.right}>{renderOrderInfo()}</div>
        </div>
      </Card>
      <DispatcherModal dispatcherModalref={modalRef} onCreate={createDispatch} />
    </div>
  );
};

export default OrderDispatchInfo;
