import "./Login.css";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Checkbox, Modal, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { setLogin } from "../../store/action";

export default function Login(props) {
  const dispatch = useDispatch();

  const handleClose = () => {
    props.handleLogin(false);
  };
  let onFinish = (values) => {
    console.log(values);
    message.success("Successfully logged in");
    dispatch(setLogin(true));
    handleClose();
  };

  const toRegister = () => {
    props.handleLogin(false);
    props.handleRegister(true);
  };

  return (
    <>
      <Modal
        title="Login"
        centered
        open={props.isLogin}
        width={300}
        footer={null}
        onCancel={handleClose}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="remember-pwd">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full"
            >
              Log in
            </Button>
            Or{" "}
            <span
              className="login-form-register cursor-pointer"
              onClick={toRegister}
            >
              register now!
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
