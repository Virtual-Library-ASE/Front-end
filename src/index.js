import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyleProvider hashPriority="high">
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#d9c5b6",
        },
        components: {},
      }}
    >
      <App />
    </ConfigProvider>
  </StyleProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
