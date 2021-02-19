import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

/* Custom Field

- Cầu nối giữa UI control và Formik
- UI control là một controlled component với props::
    + name : tên xác định control
    + value : giá trị của control
    + onChange : trigger hàm này với giá trị mới khi có thay đổi
    + onBlur : xác định khi nào thì control nào bị touched  

*/

InputField.propsTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placehoder: PropTypes.string,
  disabled: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placehoder: "",
  disabled: false,
};

function InputField(props) {
  const { field, form, type, label, placeholder, disabled } = props;
  const { name } = field;
  const { errors, touched } = form; //touched:da focus vao input
  const showError = errors[name] && touched[name];
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={name}
        {...field}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        invalid={showError}
      />

      {/* {showError && <FormFeedback>{errors[name]}</FormFeedback>} */}
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
