import React from "react";
import "./header.css";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isActiveIndex: 0,
      navItems: ["Home", "Books", "Desks", "About", "Contact"],
    };
  }
  render() {
    return (
      <div>
        <header className="header sticky sticky--top js-header">
          <nav className="navigation">
            <ul className="nav-list left inline">
              {this.state.navItems.map((item, index) => (
                <li
                  key={index}
                  className={
                    "item " +
                    (this.state.isActiveIndex === index ? "is-active" : "")
                  }
                  onClick={() => {
                    this.setState({ isActiveIndex: index });
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>

            <ul className="nav-list right inline">
              <li className="item">
                <a href="#">
                  <SearchOutlinedIcon sx={{ fontSize: 32 }} />
                </a>
              </li>
              <li className="item">
                <PersonIcon sx={{ fontSize: 32 }} />
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
