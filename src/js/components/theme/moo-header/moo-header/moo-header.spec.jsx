import React from 'react';
import { shallow } from 'enzyme';

import MooHeader from './moo-header';

describe('<MooHeader />', () => {
  it('renders as expected with siteTitle prop', () => {
    const wrapper = shallow(<MooHeader siteTitle="Site Title" />);
    expect(wrapper.contains('Site Title')).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders children as expected', () => {
    const child = <div>Child</div>;
    const wrapper = shallow(<MooHeader siteTitle="Site Title"> {child} </MooHeader>);
    expect(wrapper.contains('Child')).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with no props passed in', () => {
    const wrapper = shallow(<MooHeader />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('displays horizontal logo when there is no siteTitle', () => {
    const wrapper = shallow(<MooHeader />);
    expect(wrapper.find('.horizontal-logo').exists()).toEqual(true);
  });
});
