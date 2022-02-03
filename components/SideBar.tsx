import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const SideBar = () => {
  return (
    <Nav
      defaultActiveKey="/home"
      className="col-md-12 d-none d-md-block bg-light"
    >
      <Nav.Link href="/home">Active</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  );
};

export default SideBar;

// import React from "react";
// import { Nav } from "react-bootstrap";
// import styled from "../styles/sidebar.module.css";

// const SideBar = () => {
//   return (
//     <>
//       <Nav
//         className={`col-md-12 d-none d-md-block bg-light ${styled.sidebar}`}
//         activeKey="/home"
//         onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
//       >
//         <div className="sidebar-sticky"></div>
//         <Nav.Item>
//           <Nav.Link href="/home">Active</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="link-1">Link</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="link-2">Link</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="disabled" disabled>
//             Disabled
//           </Nav.Link>
//         </Nav.Item>
//       </Nav>
//     </>
//   );
// };
// export default SideBar;
