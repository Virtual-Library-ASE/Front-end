import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from 'react-router-dom';
import BasicCarousel from './BasicCarousel';

describe('BasicCarousel', () => {
  it("should render the correct number of images", () => {
    const wrapper = mount(
      <MemoryRouter>
        <BasicCarousel />
      </MemoryRouter>
    );
    expect(wrapper.find("img")).toHaveLength(3 + 2);
  });
});
