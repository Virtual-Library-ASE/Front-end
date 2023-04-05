import { Button, Image, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  addUserModelApi,
  getAllModelApi,
  getUserModelInfoApi,
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
    console.log(item, index);
    setActiveIndex(index);
    setActiveModelInfo(item);
  };

  const userInfo = useSelector((state) => state.userInfo);

  let addNewModel = () => {
    let req = {
      model_id: activeModelInfo.modelId,
      user_id: userInfo.userId,
      user_name: userInfo.userName,
    };

    console.log(req);

    addUserModelApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Comment!");
          handleClose();
        } else {
          console.log("Something wrong when add comment!");
        }
        setActiveIndex(-1);
      })
      .catch((err) => {
        console.log("Something wrong when add comment: ", err);
        message.error("Add comment Failed: ", err);
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
            onClick={addNewModel}
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
  const userInfo = useSelector((state) => state.userInfo);

  const handleModelModal = (bool) => {
    setShowModal(bool);
  };

  useEffect(() => {
    getUserModelInfoApi(userInfo.userId)
      .then((res) => {
        console.log(res);
        if (res.status === 200 && JSON.stringify(res.data) !== "{}") {
          setModelInfo(underscoreToCamelCaseKeys(res.data));
        } else {
          console.log("Error: res.msg");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

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
            <div>
              <Button
                onClick={() => handleModelModal(true)}
                style={{ backgroundColor: "#bdb29b", color: "#fff" }}
              >
                Add
              </Button>
            </div>
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
                <span
                  className="text-base mr-2"
                  onClick={() => handleModelModal(true)}
                >
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
        modelInfo={modelInfo}
        modelList={modelList}
        handleModelModal={handleModelModal}
      />
    </>
  );
};

export default ModelInfo;
