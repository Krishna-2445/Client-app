import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const SelectField = ({ input, meta: { touched, error }, placeholder, options }) => (
  <div>
    <Dropdown
      {...input}
      fluid
      selection
      placeholder={placeholder}
      options={options}
      value={input.value}
      onChange={(param, data) => input.onChange(data.value)}
    />
    {touched && ((error && <span>{error}</span>))}
  </div>
);

SelectField.defaultProps = {
  input: {},
  meta: {},
  placeholder: '',
  options: [],
};

SelectField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  options: PropTypes.array,
};

export default SelectField;
