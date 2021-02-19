import React from "react";
import { Link, useHistory } from "react-router-dom";
import {  Container } from "reactstrap";
import Banner from "../../../../components/Banner";
import Images from "../../../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import PhotoList from "../../components/PhotoList";
import { removePhoto } from "../../photoSlice";

MainPage.propTypes = {};
function MainPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const photos = useSelector((state) => state.photos); //lay ra list photos => render giao dien
  // console.log("List of photos:", photos);

  const handlePhotoRemoveClick = (photo) => {
    console.log("Remove :", photo);

    const removePhotoId = photo.id;
    const action = removePhoto(removePhotoId);
    dispatch(action);
  };

  const handlePhotoEditClick = (photo) => {
    console.log(("Edit:", photo));
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  };
  return (
    <div
      className="photo-main "
      style={{ color: "#FF7F50", fontWeight: "bold" }}
    >
      <Banner
        title="🎉 Your Awesome Photos 🎉 "
        backgroundUrl={Images.PINK_BG}
      />
      <Container className="text-center">
        <div className="p-5">
          <Link
            to="/photos/add"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              color: "#FF7F50",
              fontWeight: "bold",
            }}
            className="photo-add"
          >
            🎉 Add New Photo To Album 🎉
          </Link>
        </div>
        <PhotoList
          photoList={photos}
          onPhotoRemoveClick={handlePhotoRemoveClick}
          onPhotoEditClick={handlePhotoEditClick}
        />
      </Container>
    </div>
  );
}

export default MainPage;
