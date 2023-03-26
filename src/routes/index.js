import { Navigate, useRoutes } from "react-router-dom";
import PublicLayout from "../layout/index";
import Homepage from "../pages/HomePage/Homepage";
import Books from "../pages/Books/Books";
import Book from "../pages/Books/Book/Book";
import BookList from "../pages/Books/BookList";
import About from "../pages/About/About";
import Desks from "../pages/Desks/Desks";
import User from "../pages/User/User";

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
      {
        path: "book/:id",
        element: <Book />,
      },
      {
        path: "books/:category",
        element: <BookList />,
      },
      {
        path: "user",
        element: <User />,
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
