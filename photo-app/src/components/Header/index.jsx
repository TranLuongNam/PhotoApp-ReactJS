import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "./Header.scss";

Header.propTypes = {};

function Header() {
  return (
    <header className="header">
      <Container>
        {/* <Row className=" justify-content-between">
          <Col xs="auto">
            <a
              className="header__link header__title"
              href="https://github.com/TranLuongNam"
              target="_blank"
              rel="noopener noreferrer"
            >
              NamLuongTran 
            </a>
          </Col>
          <div className="header__border">|</div>
          <Col outline xs="auto">
            <NavLink
              exact
              className="header__link "
              to="/photos"
              activeClassName="header__link--active"
            >
              RandomPhoto
            </NavLink>
          </Col>
        </Row> */}
        <Row>
          <Col className="header__left">
            <i class="fas fa-camera-retro"></i>
          <span>  P-A</span>
          </Col>
          <Col className="header__right">
            <NavLink to="/photos" >HomePage</NavLink>
            <NavLink to="/sign-up" className="header__signup" >SignUp</NavLink>
          </Col>
        </Row>
        
      </Container>
    </header>
  );
}

export default Header;
