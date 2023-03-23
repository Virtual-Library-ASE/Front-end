import "./Desks.css";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { useEffect, useState } from "react";
import _ from "lodash";
import { faker } from "@faker-js/faker";
import * as React from "react";
import { Button, DatePicker, Form, TimePicker, Modal, Select } from "antd";
const { Option } = Select;

const MOCK_ROOM_LIST = _.times(5, () => ({
  id: faker.database.mongodbObjectId(),
  name: faker.name.fullName(),
  capacity: faker.finance.amount(20, 30, 0),
  thumbnail: faker.image.city(200, 200, true),
  readAmount: faker.finance.amount(0, 30, 0),
}));

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const onFinish = (fieldsValue) => {
  // Should format date value before submit.
  const rangeTimeValue = fieldsValue["range-time-picker"];
  const values = {
    ...fieldsValue,
    "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
    "range-time-picker": [
      rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
      rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
    ],
  };
  console.log("Received values of form: ", values);
};

const RoomList = (props) => {
  const roomList = MOCK_ROOM_LIST;
  return (
    <>
      <div className="room-list container">
        <h2 className="text-xl font-bold mb-2">Rooms</h2>
        {roomList.map((item, index) => (
          <div
            className="room-card h-32 w-full rounded my-4 p-2 flex justify-between items-center"
            key={index}
          >
            <div className="left overflow-hidden w-28">
              <img src={item.thumbnail} alt={item.name} />
            </div>
            <div className="middle">
              <div className="name text-base font-bold">{item.name}</div>
              <div className="desc text-sm">
                There are currently {item.capacity} seats in the room, and there
                are still {item.readAmount} seats left
              </div>
            </div>
            <div className="right mx-2">
              <button
                className="reserve-btn rounded-3xl px-2 py-1 cursor-pointer"
                onClick={() => props.handleReserveModal(true)}
              >
                Reserve
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ReserveModal = (props) => {
  const handleClose = () => {
    props.handleReserveModal(false);
  };
  return (
    <>
      <Modal
        title="Reserve"
        centered
        open={props.isShow}
        width={500}
        footer={null}
        onCancel={handleClose}
      >
        <Form
          name="time_related_controls"
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Form.Item
            name="room"
            label="Room"
            rules={[{ required: true, message: "Please select room!" }]}
          >
            <Select placeholder="select room">
              <Option value="0">Room 1</Option>
              <Option value="1">Room 2</Option>
              <Option value="2">Room 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date-picker"
            label="DatePicker"
            rules={[{ required: true, message: "Please pick your date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="range-time-picker"
            label="Time Range"
            rules={[
              { required: true, message: "Please pick your time range!" },
            ]}
          >
            <TimePicker.RangePicker />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            }}
          >
            <Button type="primary" htmlType="submit">
              Reserve
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Desks = () => {
  // Show Carousel
  const dispatch = useDispatch();
  const [isReserve, setReserveModal] = useState(false);
  const handleReserveModal = (bool) => {
    console.log(bool);
    setReserveModal(bool);
  };

  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(true));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  return (
    <>
      <div className="Rooms">
        <RoomList handleReserveModal={handleReserveModal}></RoomList>
        <ReserveModal
          isShow={isReserve}
          handleReserveModal={handleReserveModal}
        ></ReserveModal>
      </div>
    </>
  );
};
export default Desks;
