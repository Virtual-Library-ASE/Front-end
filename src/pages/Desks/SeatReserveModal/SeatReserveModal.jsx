import { Button, DatePicker, Form, message, Modal } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import { addSeatReserApi } from "../../../api/api";
import { useState } from "react";
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};

const ReserveModal = (props) => {
  const [form] = Form.useForm();
  const userInfo = useSelector((state) => state.userInfo);
  const handleClose = () => {
    props.handleReserveModal(false);
    handleClear();
  };

  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 1;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 1;
    return !!tooEarly || !!tooLate;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const handleClear = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    let req = {
      user_id: userInfo.userId,
      room_id: props.currRoomInfo["roomId"],
      start_time: values["range-time-picker"][0].unix() * 1000,
      end_time: values["range-time-picker"][1].unix() * 1000,
    };

    addSeatReserApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Reserve!");
        } else {
          console.log("Error: ", res.msg);
          message.error(res.msg);
        }
        props.handleReserveModal(false);
        handleClear();
      })
      .catch((err) => {
        console.log("Error: ", err);
        message.error(err.msg);
        props.handleReserveModal(false);
      });
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
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Form.Item label="Room">{props.currRoomInfo.roomName}</Form.Item>

          <Form.Item
            name="range-time-picker"
            label="Time Range"
            rules={[
              { type: "array", required: true, message: "Please select time!" },
            ]}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={dates || value}
              disabledDate={disabledDate}
              onCalendarChange={(val) => setDates(val)}
              onChange={(val) => setValue(val)}
              onOpenChange={onOpenChange}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 18,
                offset: 6,
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

export default ReserveModal;
