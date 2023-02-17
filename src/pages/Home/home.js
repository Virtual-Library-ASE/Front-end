import "./home.css";
import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import logo from "../../resources/images/logo.svg";
import Button from "@mui/material/Button";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveIndex: 0,
      navItems: ["Home", "Books", "Desks", "About", "Contact"],
    };
  }

  handleNav(index) {
    this.setState({ isActiveIndex: index });
  }

  render() {
    return (
      <div className="Home">
        <Header
          isActiveIndex={this.state.isActiveIndex}
          navItems={this.state.navItems}
          onClick={(index) => this.handleNav(index)}
        />
        <Footer />
      </div>
    );
  }
}

export default Home;
