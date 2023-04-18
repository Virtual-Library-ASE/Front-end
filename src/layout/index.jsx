import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import BasicCarousel from "../components/BasicCarousel/BasicCarousel";
import { useSelector } from "react-redux";

const navList = [
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
];

export default function Layouts() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isActiveIndex, setNavIndex] = useState(0);

  const { pathname } = location;
  const findPathIndex = () => {
    return navList.findIndex((item) => item.path === pathname);
  };

  useEffect(() => {
    setNavIndex(findPathIndex());
  }, [findPathIndex, pathname]);

  const isShowCarousel = useSelector((state) => state.isShowCarousel);
  const isShowFooter = useSelector((state) => state.isShowFooter);

  const handleNav = (index) => {
    // setNavIndex({ isActiveIndex: index });
    navigate(navList[index].path);
  };
  return (
    <>
      <div className="app">
        <Header
          isActiveIndex={isActiveIndex}
          navItems={navList}
          onClick={(index) => handleNav(index)}
        />
        {isShowCarousel ? <BasicCarousel /> : ""}
        <Main />
        {isShowFooter ? <Footer /> : ""}
      </div>
    </>
  );
}
