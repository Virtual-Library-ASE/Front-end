import React, { useEffect, useState } from "react";
import "./Header.css";
import Search from "../../components/Search/Search";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import { setLogin, setUserInfo } from "../../store/action";
import { useNavigate } from "react-router-dom";

function BasicHeader(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logo = require("../../resources/images/logo.png");

  const [isLogin, setIsLogin] = useState(false);
  const [isLogOut, setLogOut] = useState(false);
  const [isRegister, setRegister] = useState(false);

  const handleLogin = (bool) => {
    setIsLogin(bool);
  };

  let confirmLogOut = () => {
    message.success("Successfully logged out");
    dispatch(setLogin(false));
    handleLogOut(false);
  };
  const handleRegister = (bool) => {
    setRegister(bool);
  };
  const handleLogOut = (bool) => {
    setLogOut(bool);
  };

  const isCurrLogin = useSelector((state) => state.isLogin);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch(setLogin(true));
      dispatch(setUserInfo(userInfo));
    }
  }, []);

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
            <li className="item user-icon mr-4">
              <UserOutlined
                className="text-2xl"
                onClick={() => navigate("./user")}
              />
            </li>
            <li className="item">
              {isCurrLogin ? (
                <LogoutOutlined onClick={() => handleLogOut(true)} />
              ) : (
                <LoginOutlined onClick={() => handleLogin(true)} />
              )}
            </li>
          </ul>
        </nav>
      </header>

      <Login
        isLogin={isLogin}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
      <Register
        isRegister={isRegister}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />

      <Modal
        title="Log Out"
        open={isLogOut}
        onOk={confirmLogOut}
        onCancel={() => handleLogOut(false)}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </>
  );
}

export default BasicHeader;
