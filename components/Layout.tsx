import styled from "../styles/layout.module.scss";
import { Button, Layout, Menu } from "antd";
import Link from "next/link";
import { myLanguage } from "../stores/langStore";

type LayoutProps = {
  children: React.ReactNode;
};

const { Header, Footer, Sider, Content } = Layout;

const SiderContent = () => {
  return (
    <Sider theme="light" collapsible className={styled.sider}>
      123
    </Sider>
  );
};
const HeaderContent = () => {
  return (
    <Header className={styled.header}>
      <div>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
          <Menu.Item key={"1"}>
            <Link href="/">Главная</Link>
          </Menu.Item>
          <Menu.Item key={"2"} disabled>
            <Link href="/login">Авторизоваться</Link>
          </Menu.Item>
          <Menu.Item key={"3"}>
            <Link href="/registration">Зарегистрироваться</Link>
          </Menu.Item>
          {/* <Menu.Item key={"4"}>
            <Button
              onClick={() => {
                myLanguage.language === ruRU
                  ? (myLanguage.language = enUS)
                  : myLanguage.language === ruRU;
              }}
            >
              Сменить язык
            </Button>
          </Menu.Item> */}
        </Menu>
      </div>
    </Header>
  );
};

const LayoutPage = (props: LayoutProps) => {
  return (
    <Layout>
      <HeaderContent />
      <Layout>
        {/* <SiderContent /> */}
        <Content className={styled.content}>{props.children}</Content>
      </Layout>
      <Footer className={styled.footer}></Footer>
    </Layout>
  );
};

export default LayoutPage;
