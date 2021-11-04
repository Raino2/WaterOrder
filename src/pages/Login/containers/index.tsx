import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import WebHeader from "../../../components/Header";

const LoginPage = () => {
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "white",
          boxShadow: "0px 6px 16px rgba(0,0,0,0.08) ",
          padding: 0,
        }}
      >
        <WebHeader />
      </Header>
      <Content>
        <div style={{ minHeight: 800 }}></div>
      </Content>
      <Footer style={{ display: "flex", justifyContent: "right" }}>
        <div>CopyRight@ Best_Raino</div>
      </Footer>
    </Layout>
  );
};

export default LoginPage;
