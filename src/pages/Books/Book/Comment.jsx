import { useSelector } from "react-redux";
import { Button, Form, Input, message, Modal, Popconfirm, Switch } from "antd";
import React, { useEffect, useState } from "react";
import {
  addCommentByBookIdApi,
  getAllCommentByBookIdApi,
  updateCommentByIdApi,
} from "../../../api/api";
import {
  timestampToDate,
  underscoreToCamelCaseKeysInArray,
} from "../../../resources/js/common";
import { useParams } from "react-router-dom";

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
          props.handleUpdateCommentList();
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
  const userInfo = useSelector((state) => state.userInfo);

  const [isCommentModel, setCommentModel] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isUpdateCommentList, setUpdateCommentList] = useState(false);

  const handleUpdateCommentList = () => {
    setUpdateCommentList(!isUpdateCommentList);
  };
  // Get route parameters
  const routerParams = useParams();

  useEffect(() => {
    getAllCommentByBookIdApi(routerParams.id)
      .then((res) => {
        if (res.status === 200) {
          setCommentList(underscoreToCamelCaseKeysInArray(res.data));
        } else {
          console.log("Error: res.msg");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [isUpdateCommentList]);

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

  const deleteComment = (item) => {
    let req = {
      comment_id: item.commentId,
      is_delete: true,
    };
    updateCommentByIdApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully delete!");
          handleUpdateCommentList();
        } else {
          console.log(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        {commentList.map((comment, index) => (
          <div
            key={index}
            className="comment pb-2 mb-2 flex justify-between items-center"
          >
            <div>
              <div className="comment-name font-bold">{comment.userName}</div>
              <div className="comment-content my-1">{comment.content}</div>
              <div className="comment-details text-sm">
                <span className="comment-post-time">
                  Posted on {timestampToDate(comment.createTime)}
                </span>
              </div>
            </div>
            <div>
              {comment.userId === userInfo.userId ? (
                <Popconfirm
                  title="Delete the comment"
                  description="Are you sure to delete this comment?"
                  onConfirm={() => deleteComment(comment)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Delete</Button>
                </Popconfirm>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>

      <CommentModal
        isCommentModel={isCommentModel}
        details={params.details}
        handleCommentModal={handleCommentModal}
        handleUpdateCommentList={handleUpdateCommentList}
      />
    </>
  );
};

export default Comment;
