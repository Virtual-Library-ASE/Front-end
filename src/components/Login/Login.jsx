import "./Login.css";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Checkbox, Modal, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { setLogin, setUserInfo } from "../../store/action";
import { logInApi } from "../../api/api";
import { underscoreToCamelCaseKeys } from "../../resources/js/common";

export default function Login(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleClose = () => {
    props.handleLogin(false);
  };

  const handleClear = () => {
    form.resetFields();
  };

  const saveUserDataInLocal = (item) => {
    localStorage.setItem("userInfo", JSON.stringify(item));
  };

  let onFinish = (values) => {
    logInApi({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Login!");

          dispatch(setLogin(true));
          dispatch(setUserInfo(underscoreToCamelCaseKeys(res.data)));

          saveUserDataInLocal(underscoreToCamelCaseKeys(res.data));

          handleClear();
          handleClose();
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error(err.msg);
      });
  };

  const toRegister = () => {
    props.handleLogin(false);
    props.handleRegister(true);
    handleClear();
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
          form={form}
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
