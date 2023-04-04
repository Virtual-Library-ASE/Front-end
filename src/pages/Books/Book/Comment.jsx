import { useSelector } from "react-redux";
import { Button, Form, Input, message, Modal, Switch } from "antd";
import React, { useState } from "react";
import { addCommentByBookIdApi } from "../../../api/api";

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

const comments = [
  {
    id: 1,
    name: "John Doe",
    content: "Great article! Thanks for sharing.",
    comment_date: "2022-10-10",
    update_time: "2022-10-11 15:30:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    content: "I found this article really helpful. Keep up the good work!",
    comment_date: "2022-10-12",
    update_time: "2022-10-12 08:45:00",
  },
];

const CommentModal = (props) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    props.handleCommentModal(false);
  };

  const handleClear = () => {
    form.resetFields();
  };

  const userInfo = useSelector((state) => state.userInfo);

  let onFinish = (values) => {
    let req = {
      book_id: props.details["bookId"],
      user_id: userInfo.userId,
      comment_page: parseInt(values["commentPage"]) || 0,
      content: values.content,
    };

    addCommentByBookIdApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Comment!");
          handleClose();
        } else {
          console.log("Something wrong when add comment!");
        }

        handleClear();
      })
      .catch((err) => {
        console.log("Something wrong when add comment: ", err);
        message.error("Add comment Failed: ", err);
      });
  };

  return (
    <>
      <Modal
        title="Comment"
        centered
        open={props.isCommentModel}
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
          <Form.Item label="Name">
            <span className="font-bold"> {userInfo.userName}</span>
          </Form.Item>

          <Form.Item name="recommend" label="Recommend" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="commentPage" label="Page">
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input content" }]}
          >
            <Input.TextArea showCount maxLength={1000} />
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Comment = (params) => {
  const isLogin = useSelector((state) => state.isLogin);

  const [isCommentModel, setCommentModel] = useState(false);
  const handleCommentModal = (bool) => {
    setCommentModel(bool);
  };

  const addNewComment = () => {
    if (!isLogin) {
      message.error("Please Login first!");
      return;
    }

    handleCommentModal(true);
  };
  return (
    <>
      <div className="comment-list mt-20">
        <h2 className="text-2xl font-bold my-4">
          <span className="mr-4">Comments</span>
          <Button
            onClick={addNewComment}
            style={{ backgroundColor: "#bdb29b", color: "#fff" }}
          >
            Add
          </Button>
        </h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment pb-2 mb-2">
            <div className="comment-name font-bold">{comment.name}</div>
            <div className="comment-content my-1">{comment.content}</div>
            <div className="comment-details text-sm">
              <span className="comment-post-time">
                Posted on {comment.update_time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <CommentModal
        isCommentModel={isCommentModel}
        details={params.details}
        handleCommentModal={handleCommentModal}
      />
    </>
  );
};

export default Comment;
