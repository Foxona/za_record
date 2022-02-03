import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/SideBar";
import styled from "../styles/sidebar.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return <Container className="mt-5">{props.children}</Container>;
  // return (
  //   <Container fluid>
  //     <Row>
  //       <Col xs={2} id={styled.sidebarWrapper}>
  //         <SideBar />
  //       </Col>
  //       <Col xs={10} id={styled.pageContentWrapper}>
  //         {props.children}
  //       </Col>
  //     </Row>
  //   </Container>
  // );
};

export default Layout;
