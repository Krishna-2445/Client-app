import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import './moo-page-nav.less';

const MooPageNav = (props) => {
  const { links } = props;
  return (
    <Menu borderless stackable className="moo-page-nav">
      {
        links.map(link => (
          <Menu.Item as={NavLink} to={link.to} key={link.text} activeClassName="active">
            { link.text }
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

const linkShape = PropTypes.shape({
  text: PropTypes.string,
  to: PropTypes.string,
});


MooPageNav.propTypes = {
  links: PropTypes.arrayOf(linkShape),
};

MooPageNav.defaultProps = {
  links: [],
};


export default MooPageNav;
