import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'semantic-ui-react';
import MooPageNav from './moo-page-nav';

describe('<MooPageNav />', () => {
  it('renders correct text and links', () => {
    const links = [
      { text: 'Home', to: '/home' },
      { text: 'Away', to: '/away' },
    ];
    const wrapper = shallow(<MooPageNav links={links} />);
    expect(wrapper.contains('Home')).toEqual(true);
    expect(wrapper.contains('Away')).toEqual(true);
    expect(wrapper.find(MenuItem)).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });
});
