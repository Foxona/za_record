import styled from "../styles/layout.module.scss";
import { Layout } from "antd";

type LayoutProps = {
  children: React.ReactNode;
};

const { Header, Footer, Sider, Content } = Layout;

const LayoutPage = (props: LayoutProps) => {
  return (
    <Layout>
      {/* <Header className={styled.header}></Header> */}
      <Layout>
        {/* <Sider collapsible className={styled.sider}></Sider> */}
        <Content className={styled.content}>{props.children}</Content>
      </Layout>
      <Footer className={styled.footer}></Footer>
    </Layout>
  );
};

export default LayoutPage;
