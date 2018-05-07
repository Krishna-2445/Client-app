import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Popup } from 'semantic-ui-react';
import './moo-header-right-nav.less';

const renderLink = link => (
  <Menu.Item as={NavLink} to={link.to} key={link.text} activeClassName="active">
    <Icon name={link.icon} />
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
    <div className="moo-right-sub-nav">
      { link.subNav }
    </div>
  </Popup>
);

const MooHeaderRightNav = (props) => {
  const { links } = props;
  return (
    <Menu className="moo-right-nav" floated={'right'} stackable borderless>
      {
        links.map(link => (
          link.subNav ? renderPopup(link) : renderLink(link)
        ))
      }
      { props.children }
    </Menu>
  );
};

const linkShape = PropTypes.shape({
  text: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
  subNav: PropTypes.element,
});


MooHeaderRightNav.propTypes = {
  links: PropTypes.arrayOf(linkShape),
  children: PropTypes.any,
};

MooHeaderRightNav.defaultProps = {
  links: [],
  children: '',
};

export default MooHeaderRightNav;
