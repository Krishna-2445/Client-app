const validateFields = (values, fields) => {
  const errors = {};
  fields.forEach((field) => {
    if (field.regex && Object.prototype.hasOwnProperty.call(values, field.name)) {
      const value = values[field.name];
      if (!value.match(field.regex)) {
        errors[field.name] = `${field.name} is invalid`;
      }
    }
  });
  return errors;
};

const fieldValidator = (values, props) => {
  if (props.form === 'exposure') {
    // validate exposure fields
    return validateFields(values, props.exposureState.newExposureType.fields);
  }

  // validate policy fields
  return validateFields(values, props.configFields);
};

export default fieldValidator;
