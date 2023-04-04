import { Button, Form, Input, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useState, useImperativeHandle } from "react";

const getBirthDateFormat = (timeStamp) => {
  let date = new Date(timeStamp);
  let DD = String(date.getDate()).padStart(2, "0");
  let MM = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();

  return yyyy + "-" + MM + "-" + DD;
};
const getBasicInfoArr = (infoData) => {
  return [
    {
      label: "Name",
      value: infoData.userName,
    },
    {
      label: "Password",
      value: infoData.password.replace(/./g, "*"),
    },
    {
      label: "Email",
      value: infoData.email,
    },
    {
      label: "Phone Number",
      value: infoData.phone,
    },
    {
      label: "Gender",
      value: infoData.gender,
    },
    {
      label: "Birth Date",
      value: getBirthDateFormat(infoData.birthDate),
    },
    {
      label: "Description",
      value: infoData.desc,
    },
  ];
};

const BasicModal = (props) => {
  // Use useImperativeHandle to expose some properties that can be accessed by external refs
  useImperativeHandle(props.onRef, () => {
    // Need to return the exposed interface
    return {
      setModalOpen: setModalOpen,
    };
  });

  const [modalOpen, setModalOpen] = useState(false);

  const basicInfoArr = getBasicInfoArr(props.infoData);
  let formInitialValues = {};
  basicInfoArr.forEach((item) => (formInitialValues[item.label] = item.value));

  let onFinish = (values) => {
    console.log(values);
    message.success("Updated Successfully");
    setModalOpen(false);
  };

  let handleClose = () => {
    setModalOpen(false);
  };

  const handleDisabledIpt = (label) => {
    const disabledArr = ["Email"];
    return disabledArr.indexOf(label) >= 0;
  };

  return (
    <>
      <Modal
        title="Edit Basic Information"
        centered
        open={modalOpen}
        footer={null}
        onCancel={handleClose}
      >
        <Form
          name="normal_login"
          className="login-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={formInitialValues}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          {basicInfoArr.map((item, index) => (
            <Form.Item
              label={item.label}
              name={item.label}
              key={index}
              rules={[
                {
                  required: true,
                  message: "Please input your " + item.label + " !",
                },
              ]}
            >
              <Input
                type={item.label === "Password" ? "password" : "text"}
                disabled={handleDisabledIpt(item.label)}
              />
            </Form.Item>
          ))}

          <div className="w-full text-right">
            <Button className="login-form-button mr-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default function BasicInfo(param) {
  const basicInfoArr = getBasicInfoArr(param.infoData);
  const ChildRef = React.createRef();
  const handleOnClick = () => {
    ChildRef.current.setModalOpen(true);
  };

  return (
    <>
      <div className="basic-info mt-8">
        <h2 className="text-2xl font-bold mb-2 flex justify-between">
          <span>Basic Info</span>
          <EditOutlined
            className="info-value edit-icon cursor-pointer"
            onClick={handleOnClick}
          />
        </h2>
        <ul className="text-base">
          {basicInfoArr.map((item, index) => (
            <li className="flex py-2 justify-between" key={index}>
              <span className="label w-1/6">{item.label + ":"}</span>
              <span className="info-value">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <BasicModal onRef={ChildRef} infoData={param.infoData} />
    </>
  );
}
