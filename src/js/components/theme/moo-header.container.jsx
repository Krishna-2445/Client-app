import React from 'react';
import MooHeader from './moo-header/moo-header/moo-header';
import MooHeaderMainNav from './moo-header/moo-header-main-nav/moo-header-main-nav';

const mainLinks = [
  { text: 'Policy Holder', to: '/createPolicyHolder' },
  { text: 'Policy', to: '/createPolicy' },
];

const MooHeaderContainer = () => (
  <MooHeader>
    <MooHeaderMainNav links={mainLinks} />
  </MooHeader>
);

export default MooHeaderContainer;
