import HourglassOutlined from '@ant-design/icons/lib/icons/HourglassOutlined';
import { BackTop, Badge, Button, Col, Dropdown, Menu, notification, Row } from 'antd';
import axios from 'axios';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { shopStore } from '../../store/ShopStore/shopStore';
import CommodityCard from './components/CommodityCard';
import ShopCarDetailCard from './components/ShopCarDetailCard';
import { TShop, TShopCar } from './interfaces';
import styles from './styles/index.module.scss';

const ShopPage: React.FC = () => {
  const [shopList, setShopList] = useState<TShop[]>();
  const [itemCount, setItemCount] = useState<number>(0);
  const [shopCarMenuList, setMenuList] = useState<TShopCar[]>();
  const [dropVisible, setDropVisible] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    //滚动条置顶
    window.scrollTo(0, 0);
    notification.warning({
      message: '使用注意',
      description:
        '购物车信息只会在该页面保存，离开页面后将会清空！请及时选购并下单，如有问题，请联系客服',
    });

    axios.get('/shop').then((res) => {
      setShopList(res.data.data);
    });
  }, []);

  //购物车列表
  const renderShopCarMenu = () => {
    if (!shopCarMenuList || shopCarMenuList.length === 0) {
      return (
        <Menu className={styles.shopCarMenu}>
          <div className={styles.isEmpty}>购物车为空，快点去下单吧！</div>
        </Menu>
      );
    }
    return (
      <Menu className={styles.shopCarMenu}>
        {shopCarMenuList?.map((item, index) => {
          const props = {
            imgUrl: item.info.img,
            title: item.info.name,
            price: item.info.price,
            inventory: item.info.inventory,
            count: item.count,
          };
          return (
            <Menu.Item key={index}>
              <ShopCarDetailCard {...props} />
              <Button
                type="dashed"
                style={{ position: 'absolute', top: 5, right: 12 }}
                onClick={() => {
                  const shopCarMenuListCopy = shopCarMenuList.filter((_, idx) => {
                    return idx !== index;
                  });
                  setMenuList([...shopCarMenuListCopy]);
                  setItemCount(itemCount - item.count);
                }}
              >
                删除物品
              </Button>
            </Menu.Item>
          );
        })}
        <div className={styles.settlement}>
          <Button
            type="primary"
            style={{ height: 50, width: '100%', fontSize: 24 }}
            onClick={handleGoAuction}
            danger
          >
            立即结算
          </Button>
        </div>
      </Menu>
    );
  };

  //加入购物车
  const handleAddShopCarMenu = (uid: string) => {
    setItemCount(itemCount + 1);

    const info = shopList?.filter((item) => {
      return item.uid === uid;
    });

    let countCopy = 0;
    if (shopCarMenuList) {
      for (let item of shopCarMenuList) {
        if (item.info.uid === uid) {
          countCopy = item.count || 0;
          break;
        }
      }
      const menuListCopy = shopCarMenuList.filter((item) => {
        return item.info.uid !== uid;
      });

      setMenuList([...menuListCopy, { info: info![0], count: countCopy! + 1 }]);
    } else {
      setMenuList([{ info: info![0], count: countCopy + 1 }]);
    }
  };

  const handleGoAuction = () => {
    if (shopCarMenuList) shopStore.setShopList(shopCarMenuList);
    history.push('/auction');
  };

  return (
    <div style={{ position: 'relative' }}>
      <Dropdown
        overlay={renderShopCarMenu()}
        className={styles.shopCar}
        trigger={['click']}
        onVisibleChange={(visible) => {
          setDropVisible(visible);
        }}
        visible={dropVisible}
      >
        <Badge count={itemCount} offset={[-10, 5]} showZero>
          <div onClick={(e) => e.preventDefault()}>我的购物车</div>
        </Badge>
      </Dropdown>
      <Row gutter={[24, 24]} style={{ width: 1200, margin: '0 auto' }}>
        {shopList?.map((item, index) => {
          return (
            <Col span={8} key={index}>
              <CommodityCard info={item} onAdd={handleAddShopCarMenu} />
            </Col>
          );
        })}
      </Row>
      <BackTop visibilityHeight={0}>
        <Button size="large">
          <HourglassOutlined />
          回到顶部
        </Button>
      </BackTop>
    </div>
  );
};

export default observer(ShopPage);
