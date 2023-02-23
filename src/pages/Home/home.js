import "./home.css";
import React, { useState } from "react";
import Header from "../../components/header/header";
import HomePage from "../HomePage/homepage";
import Footer from "../../components/footer/footer";

const Home = (props) => {
  const [state, setState] = useState({
    isActiveIndex: 0,
    navItems: ["Home", "Books", "Desks", "About", "Contact"],
    currPage: props.page,
  });

  const handleNav = (index) => setState({ isActiveIndex: index });

  return (
    <div className="Home">
      <Header
        isActiveIndex={state.isActiveIndex}
        navItems={state.navItems}
        onClick={(index) => handleNav(index)}
      />
      <HomePage />
      <Footer />
    </div>
  );
};

export default Home;
