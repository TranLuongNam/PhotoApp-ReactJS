import React from "react";
// import { NavLink } from "react-router-dom";
import { Col, Container } from "reactstrap";
import "./Footer.scss";

Footer.propTypes = {};

function Footer() {
  return (
    <footer className="footer p-3"  style={{background:'black'}}>
      <Container>
        <Col className="footer__copyright">
          2020 PhotoApp.Design by <span><i>LuongNamTran</i></span>
        </Col>
      </Container>
    </footer>
  );
}

export default Footer;
