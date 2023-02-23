import React from "react";
import "./header.css";
import Search from "../search/search";
import { Icon } from "semantic-ui-react";

function BasicHeader(props) {
  return (
    <header className="hd flex text-2xl font-bold mb-14 w-full p-4 sticky sticky--top">
      <div id="logo">asdasdas</div>
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
              {item}
            </li>
          ))}
        </ul>

        <ul className="nav-list right flex">
          <li className="item">
            <Search />
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
