import React from "react";
import { HashRouter } from "react-router-dom";
import Router from "./routes/index";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;
