import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

describe("Footer component", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should contain the correct text", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toBe(
      "@Developed by ASE Group 6. All rights reserved"
    );
  });
});
