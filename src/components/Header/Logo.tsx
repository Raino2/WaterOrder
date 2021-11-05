import React from "react";
import styles from "./styles/index.module.scss";
import logo from "./images/owoSystem.jpg";
const IndexLogo = () => {
  return (
    <div className={styles.logo}>
      <img className={styles.img} src={logo} alt="暂无LOGO信息!" />
    </div>
  );
};

export default IndexLogo;
