import { Container, Row, Col } from "react-bootstrap";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return <Container className="mt-5">{props.children}</Container>;
};

export default Layout;
