import "./home.css";
import React from "react";
import Header from "../../components/header/header";
import HomePage from "../HomePage/homepage";
import Footer from "../../components/footer/footer";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveIndex: 0,
      navItems: ["Home", "Books", "Desks", "About", "Contact"],
    };
  }

  handleNav = (index) => this.setState({ isActiveIndex: index });

  render() {
    return (
      <div className="Home">
        <Header
          isActiveIndex={this.state.isActiveIndex}
          navItems={this.state.navItems}
          onClick={(index) => this.handleNav(index)}
        />
        <HomePage />
        <Footer />
      </div>
    );
  }
}

export default Home;
