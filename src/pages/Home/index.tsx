import { Button, Skeleton, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CarouselShow from '../../libs/Carousel';
import styles from './styles/index.module.scss';

const HomePage: React.FC<any> = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Spin spinning={loading} size="large" tip="首页加载中Loading...">
      <div className={styles.homePage} style={{ display: loading ? 'none' : 'block' }}>
        <CarouselShow />
      </div>
    </Spin>
  );
};

export default observer(HomePage);
