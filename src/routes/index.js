import { Navigate, useRoutes } from "react-router-dom";
import PublicLayout from "../layout/index";
import Homepage from "../pages/HomePage/Homepage";
import Books from "../pages/Books/Books";
// import Home from "../pages/Home/home";
// import Login from '../view/login/login'
// import AreaChartOutlined from '../view/bigdata'
// import Tabblepage from '../view/superform/Tabblepage'
// import Tabble from '../view/superform/Tabble'

const routes = [
  {
    path: "/",
    element: <PublicLayout />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/home",
        element: <Homepage />,
      },
      {
        path: "/books",
        element: <Books />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/404" />,
  // },
];
const Router = () => {
  return useRoutes(routes);
};

export default Router;
