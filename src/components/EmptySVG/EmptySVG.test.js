import React from "react";
import { shallow } from "enzyme";
import EmptySVG from "./EmptySVG";

describe("EmptySVG", () => {
  it("should render with given text", () => {
    const text = "This is a test";
    const wrapper = shallow(<EmptySVG text={text} />);
    expect(wrapper.find(".empty").text()).toEqual(text);
  });

  it("should render a plane SVG", () => {
    const wrapper = shallow(<EmptySVG />);
    expect(wrapper.find("#plane")).toHaveLength(1);
  });

  it("should render three cloud spans", () => {
    const wrapper = shallow(<EmptySVG />);
    expect(wrapper.find(".cloud")).toHaveLength(3);
  });
});
