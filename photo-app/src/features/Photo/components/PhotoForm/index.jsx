import React from "react";
import { Button, Container, FormGroup, Spinner } from "reactstrap";
import { PHOTO_CATEGORY_OPTIONS } from "../../../../constants/global";
import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../custom-fields/InputField";
import SelectField from "../../../../custom-fields/SelectField";
import RandomPhotoField from "../../../../components/RandomPhotoField";

import * as Yup from "yup";

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
};

function PhotoForm(props) {
  const { initialValues } = props;

  //khi change form => object validationSchema se check (Valid  or isValid)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is Required !"),
    categoryId: Yup.number().required("This Field Is Required !").nullable(),
    photo: Yup.string().when("categoryId", {
      is: 1,
      then: Yup.string().required("This Field Is Required!"),
      otherwise: Yup.string().notRequired(),
    }),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        const {
          values,
          errors,
          touched,
          isSubmitting,
          isAddMode,
        } = formikProps;
        console.log({ values, errors, touched });
        return (
          <Form className="formik">
           <Container>
           <FastField
              name="title"
              component={InputField}
              label="Title-Name : "
              placeholder="Eg: Wow Nature..."
            />
            <FastField
              name="categoryId"
              component={SelectField}
              label="Category : "
              placeholder="What's Your Photo Category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />
            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Choose Picture : "
            />

            <FormGroup>
              <Button type="submit" color={isAddMode ? "primary" : "success"}>
                {isSubmitting && (
                  <Spinner
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    type="grow"
                  />
                )}
                {isAddMode ? " Add To Album" : "Update Your Photos"}
              </Button>
            </FormGroup>
           </Container>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
