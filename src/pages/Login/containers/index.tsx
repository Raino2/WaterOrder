import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";

const LoginPage = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: "yellowgreen" }}>第一，我不叫喂</Header>
      <Content>
        <div style={{ minHeight: 800 }}>我叫楚雨荨</div>
      </Content>
      <Footer style={{ display: "flex", justifyContent: "right" }}>
        <div>CopyRight@ Best_Raino</div>
      </Footer>
    </Layout>
  );
};

export default LoginPage;
