import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import './sign-in.less';

const SignIn = (props) => {
  const { link, authenticatedUser } = props;
  if (authenticatedUser && authenticatedUser.firstName) {
    return (
      <Menu.Item as={NavLink} to={authenticatedUser.link || '#'} activeClassName="active" id="moo-sign-in">
        <Icon name="user circle outline" />
        { `${authenticatedUser.firstName} ${authenticatedUser.lastName}` }
      </Menu.Item>
    );
  }
  return (
    <Menu.Item as={NavLink} to={link} activeClassName="active" id="moo-sign-in">
      <Icon name="user circle outline" />
      Sign In
    </Menu.Item>
  );
};

const authenticatedUserShape = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  link: PropTypes.string,
});

SignIn.propTypes = {
  link: PropTypes.string,
  authenticatedUser: authenticatedUserShape,
};

SignIn.defaultProps = {
  link: '',
  authenticatedUser: null,
};

export default SignIn;
