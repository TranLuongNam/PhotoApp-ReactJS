import React from "react";
import "./Banner.scss";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { Button } from "reactstrap";

//PropTypes : kiểm tra các kiểu dữ liệu của các props components nhận vào.
Banner.propTypes = {
  title: PropTypes.string,
  backgroundUrl: PropTypes.string,
};
//defaultProps : khai báo giá trị default cho props.
Banner.defaultProps = {
  title: "",
  backgroundUrl: "",
};

function Banner(props) {
  const { title, backgroundUrl } = props;

  const bannerStyle = backgroundUrl
    ? { backgruondImage: `url(${backgroundUrl})` }
    : {};
  return (
    <section className="banner" style={bannerStyle}>
      <h1 className="banner-title">{title}</h1> 
 
    </section>
  );
}

export default Banner;
