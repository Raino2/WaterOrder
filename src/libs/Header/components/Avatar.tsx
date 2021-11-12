import { Avatar, Divider, Space } from "antd";
import React from "react";
import styles from "../styles/index.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const IndexAvatar = () => {
  return (
    <Space className={styles.avatar} size={20}>
      <div>
        <a className={styles.loginLink}>登录</a>
        <Divider type="vertical" />
        <a className={styles.loginLink}>注册</a>
      </div>
      <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
    </Space>
  );
};

export default IndexAvatar;
