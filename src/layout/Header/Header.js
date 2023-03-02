import React from "react";
import "./Header.css";
import Search from "../../components/Search/Search";
import PersonIcon from "@mui/icons-material/Person";

function BasicHeader(props) {
  const logo = require("../../resources/images/logo.png");

  return (
    <header className="hd flex text-xl font-bold w-full p-4 sticky sticky--top">
      <div id="logo">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <nav className="navigation flex justify-between">
        <ul className="nav-list flex">
          {props.navItems.map((item, index) => (
            <li
              key={index}
              className={
                "mx-3 px-2 item " +
                (props.isActiveIndex === index ? "is-active" : "")
              }
              onClick={() => {
                props.onClick(index);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>

        <ul className="nav-list right flex">
          <li className="item">
            <Search />
          </li>
          <li className="item user-icon">
            <PersonIcon fontSize="large" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default BasicHeader;
