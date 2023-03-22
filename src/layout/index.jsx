import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import BasicCarousel from "../components/Carousel/Carousel";
import { useSelector } from "react-redux";

export default function Layouts() {
  const navigate = useNavigate();

  const [navIndex, setNavIndex] = useState({
    isActiveIndex: 0,
  });

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
