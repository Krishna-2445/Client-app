import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './sign-in';

describe('<SignIn>', () => {
  describe('with no authenticated User', () => {
    it('renders Sign In with link from props', () => {
      const wrapper = shallow(<SignIn link="/sign-in" />);
      expect(wrapper.contains('Sign In')).toEqual(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with an authenticated user', () => {
    it('should show user name and default link to nothing', () => {
      const user = {
        firstName: 'Abby',
        lastName: 'Jones',
      };
      const wrapper = shallow(<SignIn authenticatedUser={user} />);
      expect(wrapper.contains('Abby Jones')).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it('should use alternate link if provided', () => {
      const user = {
        firstName: 'Abby',
        lastName: 'Jones',
        link: '/abby-jones',
      };
      const wrapper = shallow(<SignIn authenticatedUser={user} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
