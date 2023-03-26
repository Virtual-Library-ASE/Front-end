import "./User.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCarouselDisplay } from "../../store/action";
import { Avatar, Alert, Image } from "antd";
import {
  EditOutlined,
  RollbackOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const Header = () => {
  return (
    <>
      <div className="header relative text-center text-color-white">
        <div className="inner-header flex justify-center items-center text-center h-72 w-full m-0 p-0">
          <div className="user-info">
            <div className="avatar">
              <Avatar
                className=""
                size={128}
                src="https://chenmo1212.cn/file/avatar/spring.png"
              />
            </div>
            <div className="info">
              <h2 className="text-xl mt-2">ChenMo1212</h2>
              <p>Try my best!</p>
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
    </>
  );
};

const infoData = {
  name: "ChenMo",
  password: "74567456",
  email: "chenmo1212@qq.com",
  phone: "+861234567891",
  gender: "male",
  birthDate: "2000-06-26",
  desc: "Try my best!",
};
const Body = (param) => {
  return (
    <>
      <div className="content py-8">
        <Announcement />

        <BasicInfo infoData={param.infoData} />

        <RentInfo />

        <ModelInfo />
      </div>
    </>
  );
};

const Announcement = () => {
  return (
    <>
      <div className="announcement mt-4">
        <Alert
          message="Announcement"
          description="You currently do not have any book or desk borrowing records"
          type="info"
          showIcon
          closable
        />
      </div>
    </>
  );
};
const BasicInfo = (param) => {
  const infoData = param.infoData;
  const basicInfoArr = [
    {
      label: "Name: ",
      value: infoData.name,
    },
    {
      label: "Password: ",
      value: infoData.password,
    },
    {
      label: "Email: ",
      value: infoData.email,
    },
    {
      label: "Phone Number: ",
      value: infoData.phone,
    },
    {
      label: "Gender: ",
      value: infoData.gender,
    },
    {
      label: "Birth Date: ",
      value: infoData.birthDate,
    },
    {
      label: "Description: ",
      value: infoData.desc,
    },
  ];

  return (
    <>
      <div className="basic-info mt-8">
        <h2 className="text-2xl font-bold mb-2 flex justify-between">
          <span>Basic Info</span>
          <EditOutlined className="info-value edit-icon cursor-pointer" />
        </h2>
        <ul className="text-base">
          {basicInfoArr.map((item, index) => (
            <li className="flex py-2 justify-between" key={index}>
              <span className="label w-1/6">{item.label}</span>
              <span className="info-value">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const RentInfo = () => {
  return (
    <>
      <div className="rent-info mt-8">
        <h2 className="text-2xl font-bold mb-2">Rent Records</h2>

        <div className="rent-content">
          <h2 className="text-xl font-bold mb-2">Book Records</h2>
          <div className="book rounded p-2 flex justify-between items-center">
            <div className="left flex">
              <Image
                width={150}
                preview={false}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <div className="book-info ml-4 text-base py-4">
                <div className="name text-xl font-bold">Jack</div>
                <div className="author info-value mb-2">Jack</div>
                <div className="rent-date">
                  Rent Date:{" "}
                  <span className="info-value">2022-12-12 13:14</span>
                </div>
                <div className="return-date">
                  Return Date:{" "}
                  <span className="info-value">2023-01-12 13:14</span>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="m-8 info-value edit-text cursor-pointer">
                <span className="text-base mr-2">Return</span>
                <RollbackOutlined />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-4 mb-2">Desk Records</h2>
          <div className="desk rounded p-2 flex justify-between items-center">
            <div className="left flex">
              <Image
                width={150}
                preview={false}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <div className="book-info ml-4 text-base py-4">
                <div className="name text-xl font-bold">Jack</div>
                <div className="author info-value mb-2">Jack</div>
                <div className="rent-date">
                  Rent Date:{" "}
                  <span className="info-value">2022-12-12 13:14</span>
                </div>
                <div className="return-date">
                  Return Date:{" "}
                  <span className="info-value">2023-01-12 13:14</span>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="m-8 info-value edit-text cursor-pointer">
                <span className="text-base mr-2">Cancel</span>
                <CloseCircleOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ModelInfo = () => {
  return (
    <>
      <div className="model-info mt-8">
        <h2 className="text-2xl font-bold mb-2">Model</h2>
        <div className="model-container rounded p-2 flex justify-between items-center">
          <div className="left flex">
            <Image
              width={150}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
          <div className="right">
            <div className="m-8 info-value edit-text cursor-pointer">
              <span className="text-base mr-2">Change Model</span>
              <EditOutlined />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const User = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(false));
    // dispatch(setFooterDisplay(false));
  }, [dispatch]);

  return (
    <>
      <div className="user">
        <Header />

        <Body infoData={infoData} />
      </div>
    </>
  );
};

export default User;
