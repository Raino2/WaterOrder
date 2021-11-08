import { Space } from "antd";
import Link from "antd/lib/typography/Link";
import React from "react";
import styles from "../styles/index.module.scss";

const IndexLinkList = () => {
  const linkConfig: { name: string; link: string }[] = [
    {
      name: "首页",
      link: "",
    },
    {
      name: "我的订单",
      link: "",
    },
    {
      name: "给我留言",
      link: "",
    },
    {
      name: "个人中心",
      link: "https://www.baidu.com",
    },
    {
      name: "关于作者",
      link: "",
    },
    {
      name: "数据可视化",
      link: "",
    },
  ];

  const menuWidth = 835;
  const listLength = linkConfig.length;
  const listWidth = menuWidth / listLength;

  return (
    <div className={styles.menu}>
      {linkConfig.map((item) => {
        return (
          <Link
            href={item.link}
            target="_blank"
            className={styles.list}
            style={{ width: listWidth }}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default IndexLinkList;
