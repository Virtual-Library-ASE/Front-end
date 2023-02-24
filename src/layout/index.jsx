import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import BasicCarousel from "../components/Carousel/Carousel";

export default function Layouts() {
  const navigate = useNavigate();
  const [navIndex, setNavIndex] = useState({
    isActiveIndex: 0,
  });

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
    console.log(navList.navList[index]);
    navigate(navList.navList[index].path);
  };
  return (
    <>
      <Header
        isActiveIndex={navIndex.isActiveIndex}
        navItems={navList.navList}
        onClick={(index) => handleNav(index)}
      />
      <BasicCarousel />
      <Main />
      <Footer />
    </>
  );
}
