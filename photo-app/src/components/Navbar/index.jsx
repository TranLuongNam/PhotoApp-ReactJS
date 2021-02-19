import React from "react";
import { Col, Row } from "reactstrap";
import "./Navbar.scss";

Navbar.propTypes = {};

function Navbar() {
  return (
    // <Container>
    <div>
      <Row className="navbar m-0 p-0">
      <Col className="navbar__mail">
        <i class="fas fa-envelope-square"></i> <span>luongnam19021998@gmail.com</span>
      </Col>
      <Col className="navbar__phone">
        <i class="fas fa-phone-square-alt"></i> <span>(+84)327187851</span>
      </Col>
     
      <Col className="navbar__icon">
        <i class="fab fa-facebook-square "></i>
        <i class="fab fa-github-square"></i>
        <i class="fab fa-twitter-square"></i>
        <i class="fab fa-instagram-square"></i>
      </Col>
    </Row>
    </div>
    // </Container>
  );
}

export default Navbar;
