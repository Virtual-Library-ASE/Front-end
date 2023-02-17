import React from "react";
import "./header.css";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";

function Header(props) {
  return (
    <div>
      <header className="header sticky sticky--top js-header">
        <nav className="navigation">
          <ul className="nav-list left inline">
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

          <ul className="nav-list right inline">
            <li className="item">
              <SearchOutlinedIcon sx={{ fontSize: 32 }} />
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

export default Header;
