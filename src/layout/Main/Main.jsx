import React from "react";
import { Outlet } from "react-router-dom";
import "./Main.css";

export default function Main() {
  return (
    <div className="Main body">
      <Outlet />
    </div>
  );
}
