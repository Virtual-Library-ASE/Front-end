import "./UserHeader.css";
import BasicAvatar from "../../../components/BasicAvatar/BasicAvatar";
import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfoApi } from "../../../api/api";
import { underscoreToCamelCaseKeys } from "../../../resources/js/common";
import { setUserInfo } from "../../../store/action";

const AvatarModal = (params) => {
  const dispatch = useDispatch();
  const [currActiveIndex, setActiveIndex] = useState(-1);
  const handleClose = () => {
    params.handleAvatarModel(false);
    setActiveIndex(-1);
  };

  const activeAvatar = (index) => {
    setActiveIndex(index);
  };

  const userInfo = useSelector((state) => state.userInfo);

  let submitAvatar = () => {
    let req = {
      avatar_index: currActiveIndex,
      user_id: userInfo.userId,
    };

    updateUserInfoApi(req)
      .then((res) => {
        if (res.status === 200) {
          message.success("Successfully Change Avatar!");
          params.setAvatarIndex(currActiveIndex);
          params.setUpdateState(true);

          let userInfo = underscoreToCamelCaseKeys(res.data);
          dispatch(setUserInfo(userInfo));
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          console.log("Something wrong when update avatar!", res);
        }
        handleClose();
        setActiveIndex(-1);
      })
      .catch((err) => {
        message.error("Update avatar Failed: ", err);
        handleClose();
      });
  };

  return (
    <>
      <Modal
        title="Avatar"
        centered
        open={params.isAvatar}
        width={500}
        footer={null}
        onCancel={handleClose}
      >
        <div className="model-list flex flex-wrap">
          {[0, 1, 2, 3, 4, 5].map((item, index) => (
            <div
              className={
                "avatar-item shadow p-2 rounded m-1 cursor-pointer " +
                (currActiveIndex === index ? "avatar-active" : "")
              }
              key={index}
              style={{ width: "31%" }}
              onClick={() => activeAvatar(index)}
            >
              <div className="avatar-thumbnail">
                <BasicAvatar index={item} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={submitAvatar}
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

const Header = (params) => {
  let infoData = params.infoData;
  const [isAvatar, setAvatarModal] = useState(false);
  const [isUpdate, setUpdateState] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(-1);

  const handleAvatarModel = (bool) => {
    setAvatarModal(bool);
  };

  return (
    <>
      <div className="header relative text-center text-color-white">
        <div className="inner-header flex justify-center items-center text-center h-72 w-full m-0 p-0">
          <div className="user-info">
            <div
              className="avatar cursor-pointer"
              onClick={() => handleAvatarModel(true)}
            >
              <BasicAvatar
                index={isUpdate ? avatarIndex : infoData["avatarIndex"]}
              />
            </div>
            <div className="info">
              <h2 className="text-xl mt-2">{infoData.userName}</h2>
              <p>{infoData.desc}</p>
            </div>
          </div>
        </div>

        <div>
          <svg
            className="waves relative w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      <AvatarModal
        isAvatar={isAvatar}
        handleAvatarModel={handleAvatarModel}
        setAvatarIndex={setAvatarIndex}
        setUpdateState={setUpdateState}
      />
    </>
  );
};

export default Header;
