import React from "react";
import { HashRouter } from "react-router-dom";
import Router from "./routes/index";
import store from "./store";
import { Provider } from "react-redux";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Router />
      </HashRouter>
    </Provider>
  );
}

export default App;
