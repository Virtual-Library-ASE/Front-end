import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import BasicCarousel from "../components/Carousel/Carousel";

export default function Layouts() {
  const [navIndex, setNavIndex] = useState({
    isActiveIndex: 0,
  });

  const [navItem] = useState({
    navItems: ["Home", "Books", "Desks", "About", "Contact"],
  });

  const handleNav = (index) => setNavIndex({ isActiveIndex: index });
  return (
    <>
      <Header
        isActiveIndex={navIndex.isActiveIndex}
        navItems={navItem.navItems}
        onClick={(index) => handleNav(index)}
      />
      <BasicCarousel props={""} />
      <Main />
      <Footer />
    </>
  );
}
