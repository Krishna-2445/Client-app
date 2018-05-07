import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'semantic-ui-react';
import MooHeaderMainNav from './moo-header-main-nav';

describe('<MooHeaderMainNav />', () => {
  it('renders correct text and links', () => {
    const links = [
      { text: 'Home', to: '/home' },
      { text: 'Away', to: '/away' },
    ];
    const wrapper = shallow(<MooHeaderMainNav links={links} />);
    expect(wrapper.contains('Home')).toEqual(true);
    expect(wrapper.contains('Away')).toEqual(true);
    expect(wrapper.find(MenuItem)).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });
});
