import React from 'react';
import { shallow } from 'enzyme';
import BasicAvatar from './BasicAvatar';

describe('BasicAvatar', () => {
  it('renders the correct avatar based on the index prop', () => {
    const wrapper = shallow(<BasicAvatar index={2} />);
    const avatar = wrapper.find('.basic-avatar').children();
    expect(avatar.type().name).toBe('Avatar3');
  });
});
