import "./User.css";
import { useDispatch, useSelector } from "react-redux";
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

const User = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(false));
    // dispatch(setFooterDisplay(false));
  }, [dispatch]);

  const infoData = useSelector((state) => state.userInfo);

  return (
    <>
      <div className="user">
        <UserHeader infoData={infoData} />

        <Body infoData={infoData} />
      </div>
    </>
  );
};

export default User;
