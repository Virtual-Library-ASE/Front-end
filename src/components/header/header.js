import React from "react";
import "./header.css";
import Search from "../search/search";
import { Icon } from "semantic-ui-react";

function BasicHeader(props) {
  return (
    <header className="header text-2xl font-bold h-10 mb-14">
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

        <ul className="nav-list right flex w-1/4">
          <li className="item">
            <Search className="h-2"></Search>
          </li>
          <li className="item">
            <Icon name="user" className="user-icon" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default BasicHeader;
