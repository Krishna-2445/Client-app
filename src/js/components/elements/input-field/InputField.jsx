import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const InputField = ({ input, meta, labelText, type }) => (
  <div>
    <Input
      {...input}
      type={type}
      size="large"
      fluid
      label={labelText}
    />
    {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
  </div>
);

InputField.defaultProps = {
  input: {},
  meta: {},
  labelText: '',
  type: 'text',
  // placeholder: '',
};

InputField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  labelText: PropTypes.string,
  type: PropTypes.string,
  // placeholder: PropTypes.string,
};

export default InputField;
