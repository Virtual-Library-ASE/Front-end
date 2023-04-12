import React, { useState } from "react";
import { useSelector } from "react-redux";

import { addBookRentApi } from "../../../api/api";
import { Button, DatePicker, Form, message, Modal } from "antd";
const { RangePicker } = DatePicker;

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

const ReserveModal = (props) => {
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);

  const bookDetail = props.bookDetail;
  const userInfo = useSelector((state) => state.userInfo);

  const handleClose = () => {
    props.handleReserveModal(false);
  };

  const onFinish = (values) => {
    if (!userInfo.userId) {
      message.error("Something wrong about user id");
      return;
    }
    if (!bookDetail.bookId) {
      message.error("Something wrong about book id");
      return;
    }

    let req = {
      user_id: userInfo.userId,
      book_id: bookDetail.bookId,
      start_time: values["range-time-picker"][0].unix() * 1000,
      end_time: values["range-time-picker"][1].unix() * 1000,
    };

    addBookRentApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Rent!");
          props.updateBookState(false);

          handleClose();
        } else {
          console.log("Error: ", res.msg);
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        message.error(err);
      });
  };

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 7;
    return !!tooEarly || !!tooLate;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
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
          <Form.Item name="BookTitle" label="Book">
            <span className="font-bold">{bookDetail.bookName}</span>
          </Form.Item>
          <Form.Item name="BookAuthor" label="Author">
            {bookDetail.author}
          </Form.Item>

          <Form.Item
            name="range-time-picker"
            label="Date Range"
            rules={[
              { required: true, message: "Please pick your date range!" },
            ]}
          >
            <RangePicker
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

export default ReserveModal;
