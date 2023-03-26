import "./User.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCarouselDisplay } from "../../store/action";
import UserHeader from "./UserHeader/UserHeader";
import Announcement from "./Announcement/Announcement";
import BasicInfo from "./BasicInfo/BasicInfo";
import RentInfo from "./RentInfo/RentInfo";
import ModelInfo from "./ModelInfo/ModelInfo";

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

const infoData = {
  name: "ChenMo",
  password: "74567456",
  email: "chenmo1212@qq.com",
  phone: "+861234567891",
  gender: "male",
  birthDate: "2000-06-26",
  desc: "Try my best!",
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
        <UserHeader />

        <Body infoData={infoData} />
      </div>
    </>
  );
};

export default User;
