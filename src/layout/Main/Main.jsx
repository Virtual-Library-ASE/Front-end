import "./Main.css";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="body">
      <Outlet />
    </div>
  );
}
