import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './moo-header.less';
import logo from '../assets/standard_positive_logo.svg';
import horizontalLogo from '../assets/mutual-brand-blue.svg';

const MooHeader = (props) => {
  const { siteTitle, children } = props;

  return (
    <div className="moo-header-wrapper">
      <div className="moo-header">
        <NavLink to="/">
          { siteTitle ? <img src={logo} className="logo" /> : <img src={horizontalLogo} className="horizontal-logo" /> }
          <h1>{siteTitle}</h1>
        </NavLink>
        { children }
      </div>
    </div>
  );
};

MooHeader.propTypes = {
  siteTitle: PropTypes.string,
  children: PropTypes.any,
};

MooHeader.defaultProps = {
  siteTitle: '',
  children: '',
};

export default MooHeader;

