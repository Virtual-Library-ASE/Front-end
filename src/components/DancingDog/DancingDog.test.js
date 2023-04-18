import React from 'react';
import { shallow } from 'enzyme';
import DancingDog from './DancingDog';

describe('DancingDog', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<DancingDog />);
    expect(wrapper.find('.dancing-pug')).toHaveLength(1);
  });

  it('should display "GOT YOU" text', () => {
    const wrapper = shallow(<DancingDog />);
    expect(wrapper.find('h2').at(0).text()).toEqual('GOT YOU');
  });

  it('should display "Nothing in Agreement!" text', () => {
    const wrapper = shallow(<DancingDog />);
    expect(wrapper.find('h2').at(1).text()).toEqual('Nothing in Agreement!');
  });
});
