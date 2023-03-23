import React from "react";
import "./Header.css";
import Search from "../../components/Search/Search";
import Sign from "../../components/Sign/Sign";
import { UserOutlined } from "@ant-design/icons";

function BasicHeader(props) {
  const logo = require("../../resources/images/logo.png");

  const [isLogin, setLogin] = React.useState(false);
  const handleLogin = (bool) => {
    setLogin(bool);
  };

  return (
    <>
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
            <li className="item user-icon" onClick={() => handleLogin(true)}>
              <UserOutlined className="text-2xl" />
            </li>
          </ul>
        </nav>
      </header>

      <Sign isLogin={isLogin} handleLogin={handleLogin} />
    </>
  );
}

export default BasicHeader;
