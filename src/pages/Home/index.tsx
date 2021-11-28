import DesktopOutlined from '@ant-design/icons/lib/icons/DesktopOutlined';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import ReadOutlined from '@ant-design/icons/lib/icons/ReadOutlined';
import ShopOutlined from '@ant-design/icons/lib/icons/ShopOutlined';
import { Button, message, Rate, Spin, Timeline } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import CarouselShow from '../../libs/Carousel';
import {
  ClockCircleOutlined,
  ShoppingTwoTone,
  DollarTwoTone,
  FireTwoTone,
  SmileOutlined,
} from '@ant-design/icons';
import { TServerBoard } from './interfaces';
import styles from './styles/index.module.scss';
import overLay from '../../assets/images/Overlay.jpg';
import OrderStep from './components/OrderStep';
import { authStore } from '../../store/AuthStore/authStore';
import axios from 'axios';
import { useHistory } from 'react-router';

const HomePage: React.FC<any> = () => {
  const [loading, setLoading] = useState<boolean>();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const renderServerBoard = (props: TServerBoard) => {
    const { icon, title, info, color } = props;
    return (
      <div className={styles.server}>
        <div className={styles.serverIcon} style={{ color: color }}>
          {icon}
        </div>
        <div className={styles.serverMess}>
          <span style={{ fontSize: 24, fontWeight: 800, marginTop: 14 }}>{title}</span>
          <span style={{ fontSize: 16, color: 'rgba(0,0,0,0.35)' }}>{info}</span>
        </div>
      </div>
    );
  };

  const renderTimeLine = () => {
    return (
      <Timeline mode="left" style={{ marginTop: 60, marginLeft: 20 }}>
        <Timeline.Item>&nbsp;&nbsp;2021年10月,我们创建于温州理工学院数智学院</Timeline.Item>
        <Timeline.Item color="green">
          经过不懈努力,我们于2021年12月31日前完成了我们的网站开发
        </Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
          &nbsp;&nbsp;2022年初,我们接到了第一笔订单
        </Timeline.Item>
        <Timeline.Item color="red">源源不断的订单正在冲击我们的系统</Timeline.Item>
        <Timeline.Item>
          &nbsp;&nbsp;我们决定优化我们的产品以及产品的供应链、市场定位等等
        </Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
          未来、我们的产品会变得越来越好，请坚定不移的选择我们的产品，并支持我们！
        </Timeline.Item>
      </Timeline>
    );
  };

  const postUserRate = (rate: number) => {
    if (!authStore.isLogin) {
      message.error('请先登录！');
      setTimeout(() => {
        history.push('/login');
      }, 2000);
      return;
    }

    axios
      .post(`/user/rate`, {
        uid: authStore.user.uid,
        rate,
      })
      .then((res) => {
        message.success('感谢您的反馈！');
        authStore.setUserRate(rate);
      });
  };

  return (
    <Spin spinning={loading} size="large" tip="首页加载中Loading...">
      <div className={styles.homePage} style={{ display: loading ? 'none' : 'block' }}>
        <CarouselShow />
      </div>
      <div className={styles.board}>
        {/* 服务介绍板块 */}
        <div className={styles.serverBoard}>
          {renderServerBoard({
            icon: <ShopOutlined />,
            title: '线下零售',
            info: '门店、外卖,多元化销售线',
            color: 'rgb(228,27,34)',
          })}
          {renderServerBoard({
            icon: <HomeOutlined />,
            title: '小区配送',
            info: '提供送到家的订水服务',
            color: 'rgb(228,27,34)',
          })}
          {renderServerBoard({
            icon: <ReadOutlined />,
            title: '高校合作',
            info: '超级便捷,覆盖所有教学楼',
            color: 'rgb(0,162,232)',
          })}
          {renderServerBoard({
            icon: <DesktopOutlined />,
            title: '企业优质服务',
            info: '满足所有企业的日常需求',
            color: 'rgb(0,162,232)',
          })}
        </div>
        <div className={styles.levelUp}>
          {renderTimeLine()}
          <h1 style={{ fontWeight: 800, fontSize: 20 }}>
            <span>
              给我们评分：
              {
                <Rate
                  character={<SmileOutlined />}
                  allowClear={false}
                  allowHalf
                  value={authStore.userRate ? authStore.userRate : 5}
                  disabled={!!authStore.userRate}
                  onChange={postUserRate}
                />
              }
            </span>
          </h1>
        </div>
      </div>
      <div className={styles.orderStep} style={{ backgroundImage: `url(${overLay})` }}>
        <h1 className={styles.title}>三步获得我们的产品</h1>
        <div className={styles.step}>
          <OrderStep icon={<ShoppingTwoTone twoToneColor="#52c41a" />} title="①挑选商品" />
          <OrderStep icon={<DollarTwoTone twoToneColor="rgb(255,201,14)" />} title="②支付订单" />
          <OrderStep icon={<FireTwoTone twoToneColor="rgb(240,87,30)" />} title="③火速配送" />
        </div>
      </div>
      <div style={{ width: 230, height: 60, margin: '0 auto', marginTop: 15 }}>
        <Button
          type="primary"
          danger
          style={{ width: 230, height: 60, fontSize: 28, backgroundColor: 'rgb(236,114,89)' }}
        >
          立即下单
        </Button>
      </div>
    </Spin>
  );
};

export default observer(HomePage);
