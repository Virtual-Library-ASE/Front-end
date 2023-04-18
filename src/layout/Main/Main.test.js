import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

describe('Main component', () => {
  it('should render Outlet component', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find('Outlet')).toHaveLength(1);
  });
})
