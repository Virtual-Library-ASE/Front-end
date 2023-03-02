import { Navigate, useRoutes } from "react-router-dom";
import PublicLayout from "../layout/index";
import Homepage from "../pages/HomePage/Homepage";
import Books from "../pages/Books/Books";
import About from "../pages/About/About";
import Desks from "../pages/Desks/Desks";

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: "home",
        element: <Homepage />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "desks",
        element: <Desks />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
const Router = () => {
  return useRoutes(routes);
};

export default Router;
