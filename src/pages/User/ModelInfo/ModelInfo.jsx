import { Button, Image, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  addUserModelApi,
  getAllModelApi,
  getUserModelInfoApi,
  updateUserModelApi,
} from "../../../api/api";
import {
  underscoreToCamelCaseKeys,
  underscoreToCamelCaseKeysInArray,
} from "../../../resources/js/common";
import { useSelector } from "react-redux";
import EmptySVG from "../../../components/EmptySVG/EmptySVG";
import "./ModelInfo.css";

const ModelModal = (params) => {
  const [currActiveIndex, setActiveIndex] = useState(-1);
  const [activeModelInfo, setActiveModelInfo] = useState({});
  const handleClose = () => {
    params.handleModelModal(false);
    setActiveIndex(-1);
  };

  const activeModel = (item, index) => {
    setActiveIndex(index);
    setActiveModelInfo(item);
  };

  const userInfo = useSelector((state) => state.userInfo);

  const handleSubmit = () => {
    if (params.isChangeModel) {
      changeModel();
    } else {
      addNewModel();
    }
  };

  let addNewModel = () => {
    let req = {
      model_id: activeModelInfo.modelId,
      user_id: userInfo.userId,
      user_name: userInfo.userName,
    };

    addUserModelApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Change Model!");
          handleClose();
        } else {
          console.log("Something wrong when add comment!");
        }
        setActiveIndex(-1);
      })
      .catch((err) => {
        console.log("Something wrong when add comment: ", err);
        message.error("Add User Model Failed: ", err);
      });
  };

  let changeModel = () => {
    let req = {
      model_id: activeModelInfo.modelId,
      thumbnail: activeModelInfo.thumbnail,
      user_id: userInfo.userId,
    };

    updateUserModelApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Change Model!");
          params.setModelInfo(activeModelInfo);
          handleClose();
        } else {
          console.log("Something wrong when add comment!");
        }
        setActiveIndex(-1);
      })
      .catch((err) => {
        console.log("Something wrong when add comment: ", err);
        message.error("Add User Model Failed: ", err);
      });
  };

  return (
    <>
      <Modal
        title="Model"
        centered
        open={params.isShowModal}
        width={500}
        footer={null}
        onCancel={handleClose}
      >
        <div className="model-list flex flex-wrap">
          {params.modelList.map((item, index) => (
            <div
              className={
                "model-item shadow p-2 rounded m-1 cursor-pointer " +
                (currActiveIndex === index ? "model-active" : "")
              }
              key={index}
              style={{ width: "48%" }}
              onClick={() => activeModel(item, index)}
            >
              <div className="model-thumbnail">
                <Image width={200} src={item.thumbnail} />
              </div>
              <div className="model-info">
                <p className="model-name font-bold">{item.modelName}</p>
                <p className="create-time text-sm">{item.createTime}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            className="mt-4 w-1/2"
            type="primary"
            disabled={currActiveIndex === -1}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

const ModelInfo = () => {
  const [modelInfo, setModelInfo] = useState({});
  const [modelList, setModelList] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isChangeModel, setChangeModel] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);

  const handleModelModal = (bool) => {
    setShowModal(bool);
  };

  const changeModel = () => {
    setChangeModel(true);
    setShowModal(true);
  };

  useEffect(() => {
    if (userInfo.userId) {
      getUserModelInfoApi(userInfo.userId)
        .then((res) => {
          if (res.status === 200 && JSON.stringify(res.data) !== "{}") {
            setModelInfo(underscoreToCamelCaseKeys(res.data));
          } else {
            console.log("Error: res.msg");
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }, [userInfo]);

  useEffect(() => {
    getAllModelApi()
      .then((res) => {
        let resData = res.data.filter(
          (e) => e["model_name"].indexOf("Sharon") >= 0
        );
        setModelList(underscoreToCamelCaseKeysInArray(resData));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="model-info mt-8">
        <h2 className="text-2xl font-bold my-4">
          <span className="mr-4">Model</span>
          {JSON.stringify(modelInfo) === "{}" ? (
            <Button
              onClick={() => handleModelModal(true)}
              style={{ backgroundColor: "#bdb29b", color: "#fff" }}
            >
              Add
            </Button>
          ) : (
            ""
          )}
        </h2>

        {JSON.stringify(modelInfo) !== "{}" ? (
          <div className="model-container rounded p-2 flex justify-between items-center">
            <div className="left flex">
              <Image width={150} src={modelInfo.thumbnail} />
              <div className="model-info m-8">
                <div className="model-name font-bold">
                  {modelInfo.modelName}
                </div>
                <div className="create-time text-sm">
                  {modelInfo.createTime}
                </div>
              </div>
            </div>
            <div className="right">
              <div className="m-8 info-value edit-text cursor-pointer">
                <span className="text-base mr-2" onClick={() => changeModel()}>
                  Change Model
                </span>
                <EditOutlined />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptySVG text={"No Model Records"} />
          </div>
        )}
      </div>

      <ModelModal
        isShowModal={isShowModal}
        isChangeModel={isChangeModel}
        modelInfo={modelInfo}
        modelList={modelList}
        setModelInfo={setModelInfo}
        handleModelModal={handleModelModal}
      />
    </>
  );
};

export default ModelInfo;
