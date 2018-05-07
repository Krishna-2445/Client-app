import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu, Popup } from 'semantic-ui-react';
import './moo-header-main-nav.less';

const renderLink = link => (
  <Menu.Item as={NavLink} to={link.to} key={link.text} activeClassName="active">
    { link.text }
  </Menu.Item>
);

const renderPopup = link => (
  <Popup
    key={link.text}
    trigger={renderLink(link)}
    on="click"
    style={{ top: '70px' }}
    flowing
  >
    <div className="moo-main-sub-nav">
      { link.subNav }
    </div>
  </Popup>
);

const MooHeaderMainNav = (props) => {
  const { links } = props;
  return (
    <Menu borderless floated className="moo-menu-bar">
      {
        links.map(link => (
          link.subNav ? renderPopup(link) : renderLink(link)
        ))
      }
    </Menu>
  );
};

const linkShape = PropTypes.shape({
  text: PropTypes.string,
  to: PropTypes.string,
  subNav: PropTypes.element,
});


MooHeaderMainNav.propTypes = {
  links: PropTypes.arrayOf(linkShape),
};

MooHeaderMainNav.defaultProps = {
  links: [],
};


export default MooHeaderMainNav;
