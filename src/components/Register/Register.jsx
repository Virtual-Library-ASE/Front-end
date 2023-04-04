import "./Register.css";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Modal,
  DatePicker,
  message,
} from "antd";
import React from "react";
import { signupApi } from "../../api/api";
import { getRandomNumber } from "../../resources/js/common";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = (props) => {
  const [form] = Form.useForm();

  const handleClose = () => {
    props.handleRegister(false);
  };

  const handleClear = () => {
    form.resetFields();
  };

  let onFinish = (values) => {
    const avatarBasicUrl =
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/";

    let req = {
      user_name: values.nickname,
      email: values.email,
      password: values.password,
      avatar: avatarBasicUrl + getRandomNumber() + ".jpg",
      phone: values.phone,
      gender: values.gender,
      birth_date: values.birthDate.unix(),
      desc: values.desc,
    };

    signupApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Register");
          handleClose();
          toLogin();
        } else {
          console.log("Something wrong when user register");
        }

        handleClear();
      })
      .catch((err) => {
        console.log("Something wrong when user register: ", err);
        message.error("Register Failed: ", err);
      });
  };

  const toLogin = () => {
    props.handleRegister(false);
    props.handleLogin(true);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="353">+353</Option>
        <Option value="86">+86</Option>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Modal
        title="Register"
        centered
        open={props.isRegister}
        width={500}
        footer={null}
        onCancel={handleClose}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "353",
          }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Birth Date"
            rules={[{ required: true, message: "Please pick your date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="desc"
            label="Intro"
            className="intro"
            rules={[{ required: true, message: "Please input Intro" }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            className="agreement-container"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the{" "}
              <a href="/" className="agreement">
                agreement
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button w-full"
            >
              Register
            </Button>
            Or{" "}
            <span
              className="register-form-login cursor-pointer"
              onClick={toLogin}
            >
              Login now!
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Register;
