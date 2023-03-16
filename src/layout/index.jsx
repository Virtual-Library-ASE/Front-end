import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import BasicCarousel from "../components/Carousel/Carousel";
import { useSelector, useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../store/action";

export default function Layouts() {
  const navigate = useNavigate();
  const location = useLocation();
  let currRouter = location.pathname.split("/")[1];

  const [navIndex, setNavIndex] = useState({
    isActiveIndex: 0,
  });

  const dispatch = useDispatch();
  dispatch(setCarouselDisplay(currRouter !== "about"));
  dispatch(setFooterDisplay(currRouter !== "about"));

  const isShowCarousel = useSelector((state) => state.isShowCarousel);
  const isShowFooter = useSelector((state) => state.isShowFooter);

  const [navList] = useState({
    navList: [
      {
        title: "Home",
        path: "/home",
      },
      {
        title: "Books",
        path: "/books",
      },
      {
        title: "Desks",
        path: "/desks",
      },
      {
        title: "About",
        path: "/about",
      },
    ],
  });

  const handleNav = (index) => {
    setNavIndex({ isActiveIndex: index });
    navigate(navList.navList[index].path);
  };
  return (
    <>
      <Header
        isActiveIndex={navIndex.isActiveIndex}
        navItems={navList.navList}
        onClick={(index) => handleNav(index)}
      />
      {isShowCarousel ? <BasicCarousel /> : ""}
      <Main />
      {isShowFooter ? <Footer /> : ""}
    </>
  );
}
