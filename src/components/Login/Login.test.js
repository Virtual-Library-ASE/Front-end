import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import { Modal, Form, Input, Checkbox, Button } from "antd";

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => {}),
}));

jest.mock('../../api/api', () => ({
  logInApi: jest.fn(() => Promise.resolve({ status: 200, data: {} })),
}));

describe("Login component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Login isLogin={true}/>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Modal component', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('should render Form component', () => {
    expect(wrapper.find(Form)).toHaveLength(1);
  });

  it("should have two Input components", () => {
    expect(wrapper.find(Input)).toHaveLength(2);
  });

  it("should have one Checkbox component", () => {
    expect(wrapper.find(Checkbox)).toHaveLength(1);
  });

  it("should have a Button component", () => {
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).prop('htmlType')).toEqual('submit');
    expect(wrapper.find(Button).text()).toEqual('Log in');
  });

  it('should render span element for register', () => {
    expect(wrapper.find('.login-form-register')).toHaveLength(1);
    expect(wrapper.find('.login-form-register').text()).toEqual('register now!');
  });
});
