import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem, Icon } from 'semantic-ui-react';
import MooHeaderRightNav from './moo-header-right-nav';

describe('<MooHeaderRightNav />', () => {
  const links = [
    { text: 'Rock', to: '/rock', icon: 'hand rock' },
    { text: 'Paper', to: '/paper', icon: 'hand paper' },
    { text: 'Scissors', to: '/scissors', icon: 'hand scissors' },
    { text: 'Lizard', to: '/lizard', icon: 'hand lizard' },
    { text: 'Spock', to: '/spock', icon: 'hand spock' },
  ];

  it('renders correct text, links, and icons', () => {
    const wrapper = shallow(<MooHeaderRightNav links={links} />);
    expect(wrapper.find(MenuItem)).toHaveLength(5);
    expect(wrapper.find(Icon)).toHaveLength(5);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders children', () => {
    const child = <div>Child</div>;
    const wrapper = shallow(<MooHeaderRightNav links={links}> {child} </MooHeaderRightNav>);
    expect(wrapper.contains('Child')).toEqual(true);
  });
});
