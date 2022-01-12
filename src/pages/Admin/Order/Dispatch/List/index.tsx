import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from './styles/index.module.scss';

const OrderDispatchList: React.FC = () => {
  const [value, setValue] = useState<string>();
  const history = useHistory();

  const handleSearch = () => {
    axios
      .get(`/admin/order/${value}`)
      .then(() => {
        history.push(`/admin/order/dispatch/info/${value}`);
      })
      .catch(() => {
        message.error('不存在的订单');
        setValue(undefined);
      });
  };

  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <h1 className={styles.title}>
          <SearchOutlined rotate={90} />
          <span> 查询订单配送状态</span>
        </h1>
        <div className={styles.search}>
          <Input
            className={styles.searchInput}
            size="large"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="primary" className={styles.searchButton} onClick={handleSearch}>
            搜索订单
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDispatchList;
