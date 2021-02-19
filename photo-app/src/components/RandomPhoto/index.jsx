import PropTypes from "prop-types";
import React from "react";
import { Button } from "reactstrap";
import "./randomPhoto.scss";

RandomPhoto.propsTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onImageUrlChange: PropTypes.func,
  onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
  name: "",
  imageUrl: "",
  onImageUrlChange: null,
  onRandomButtonBlur: null,
};

const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2000); //random id
  return `https://picsum.photos/id/${randomId}/200/200`; //lay id random tren picsum.photos => render img co kich thuong 300*300
};

function RandomPhoto(props) {
  const { name, imageUrl, onRandomButtonBlur, onImageUrlChange } = props;

  const handleRandomPhotoClick = async () => {
    //Khi click thi render ra mot url moi,goi toi onImageUrlChange(nhan vao gia tri random duoc render tu fuction getRandomImageUrl())
    if (onImageUrlChange) {
      const randomImageUrl = getRandomImageUrl();
      onImageUrlChange(randomImageUrl);
    }
  };

  return (
    <div className="random-photo">
      <div className="random-photo__button">
        <Button
          outline
          name={name}
          color="primary"
          onBlur={onRandomButtonBlur}
          onClick={handleRandomPhotoClick}
        >
          Random A Picture
        </Button>
      </div>
      <div className="random-photo__photo">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Oops ... not found.Please Click Again!"
            onError={(e) => handleRandomPhotoClick}
          />
        )}
      </div>
    </div>
  );
}

export default RandomPhoto;
