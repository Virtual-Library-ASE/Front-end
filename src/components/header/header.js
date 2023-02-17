import React from "react";
import "./header.css";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";

function Header(props) {
  return (
    <div>
      <header className="header text-2xl font-bold sticky sticky--top">
        <nav className="navigation flex justify-between">
          <ul className="nav-list flex gap-4">
            {props.navItems.map((item, index) => (
              <li
                key={index}
                className={
                  "item " + (props.isActiveIndex === index ? "is-active" : "")
                }
                onClick={() => {
                  props.onClick(index);
                }}
              >
                {item}
              </li>
            ))}
          </ul>

          <ul className="nav-list right flex gap-4">
            <li className="item w-3">
              <SearchOutlinedIcon sx={{ fontSize: 32 }} />
            </li>
            <li className="item w-3">
              <PersonIcon sx={{ fontSize: 32 }} />
            </li>
            <li className="item w-3">
              <Avatar
                alt="your avatar"
                src={require("../../resources/images/avatar.png")}
              ></Avatar>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
