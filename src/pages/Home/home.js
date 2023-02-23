import "./home.css";
import React, { useState } from "react";
import Header from "../../components/header/header";
import HomePage from "../HomePage/homepage";
import Footer from "../../components/footer/footer";

const Home = () => {
  const [navIndex, setNavIndex] = useState({
    isActiveIndex: 0,
  });

  const [navItem] = useState({
    navItems: ["Home", "Books", "Desks", "About", "Contact"],
  });

  const handleNav = (index) => setNavIndex({ isActiveIndex: index });

  return (
    <div className="Home">
      <Header
        isActiveIndex={navIndex.isActiveIndex}
        navItems={navItem.navItems}
        onClick={(index) => handleNav(index)}
      />
      <div className="body">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
