import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import RandomPhoto from "../RandomPhoto";
import { ErrorMessage } from "formik";

RandomPhotoField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
};
RandomPhotoField.defaultProps = {
  label: "",
};

function RandomPhotoField(props) {
  const { field, form, label } = props; //props cua Formik
  const { name, value, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const handleImageUrlChange = (newImageUrl) => {
    //moi lan click vao button Random A Photo se goi toi function handleRandomPhotoClick(component RandomPhoto)
    form.setFieldValue(name, newImageUrl);
    //trigger form,update form => rerender lai giao dien => rerender lai voi gia tri field(name va new value(newImageUrl))
  };

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <RandomPhoto
        name={name}
        imageUrl={value}
        onImageUrlChange={handleImageUrlChange} 
        onRandomButtonBlur={onBlur}
      />
      <div className={showError ? "is-invalid" : ""}></div>
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
    
  );
}

export default RandomPhotoField;
