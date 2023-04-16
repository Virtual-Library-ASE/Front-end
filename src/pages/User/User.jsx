import "./User.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCarouselDisplay } from "../../store/action";
import UserHeader from "./UserHeader/UserHeader";
import BasicInfo from "./BasicInfo/BasicInfo";
import RentInfo from "./RentInfo/RentInfo";
import ModelInfo from "./ModelInfo/ModelInfo";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Body = (param) => {
  return (
    <>
      <div className="content py-8">
        <BasicInfo infoData={param.infoData} />

        <RentInfo />

        <ModelInfo />
      </div>
    </>
  );
};

const checkLoginState = () => {
  const userInfo = localStorage.getItem("userInfo");
  return Boolean(userInfo);
};

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Show BasicCarousel
    dispatch(setCarouselDisplay(false));
    // dispatch(setFooterDisplay(false));

    if (!checkLoginState()) {
      message.error("You should login first!");

      navigate("/home");
    }
  }, [dispatch, navigate]);

  const userInfo = useSelector((state) => state.userInfo);

  return (
    <>
      <div className="user">
        <UserHeader infoData={userInfo} />

        <Body infoData={userInfo} />
      </div>
    </>
  );
};

export default User;
