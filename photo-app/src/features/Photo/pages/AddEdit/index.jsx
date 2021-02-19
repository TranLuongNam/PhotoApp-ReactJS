import React from "react";
// import { Link } from "react-router-dom";
// import { Button, Container } from "reactstrap";
import Banner from "../../../../components/Banner";
import PhotoForm from "../../components/PhotoForm";
import { addPhoto, updatePhoto } from "../../photoSlice";
// import PhotoForm from "../../components/PhotoForm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function AddEditPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;

  const editedPhoto = useSelector((state) =>
    state.photos.find((x) => x.id === +photoId)
  );

  const initialValues = isAddMode
    ? { title: "", categoryId: null, photo: "" }
    : editedPhoto;

  const handleSubmit = (values) => {
    return new Promise((resolve) => {
      console.log("Form submit:", values);

      setTimeout(() => {
        //Check
        if (isAddMode) {
          const action = addPhoto(values); //values = payload cua action
          console.log({ action });
          dispatch(action);
        } else {
          const action = updatePhoto(values);
          dispatch(action);
        }

        resolve(true);
        history.push("/photos");
      }, 2000);
    });
  };
  return (
    <div className="photo-edit" style={{ color: "#FF7F50", fontWeight: "bold" }}>
      <Banner title="🎉 Pick Your Amazing Photo 🎉" />
      <div
        style={{
          fontSize: "20px",
          textDecoration: "none",
          color: "#FF7F50",
          fontWeight: "bold",
          textAlign: "center",
          padding: 5,
        }}
      >
          {isAddMode ? "🎉 You Are In The Process Of Adding 🎉" : "🎉 You Are In The Process Of Editing 🎉"}
      </div>
      <div className="pt-3">
        <PhotoForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          isAddMode={isAddMode}
        />
      </div>
    </div>
  );
}

export default AddEditPage;
