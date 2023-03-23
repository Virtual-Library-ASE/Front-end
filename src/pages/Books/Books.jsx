import "./Books.css";
import {
  FileImageOutlined,
  CoffeeOutlined,
  HeartOutlined,
  ScissorOutlined,
  BookOutlined,
} from "@ant-design/icons";

import BookList from "./BookList";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Category = (params) => {
  const categoryList = params.categoryList;
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="category-container flex justify-between">
        {categoryList.map((item, index) => (
          // eslint-disable-next-line react/style-prop-object
          <div
            key={index}
            className="card rounded h-28 w-1/6 p-4"
            style={{ backgroundColor: item.bgColor }}
          >
            <div className="icon">{item.icon}</div>
            <div className="title font-bold my-2 text-sm">{item.title}</div>
            <div
              className="link text-xs cursor-pointer"
              style={{ color: "#f65d4f" }}
              onClick={() => navigate("/books/" + item.title)}
            >
              Read More >
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const TotalBookList = (params) => {
  const bookList = params.bookList;
  return (
    <>
      <BookList bookList={bookList} title="Book Recommended"></BookList>
    </>
  );
};

const bookList = [
  {
    cover: require("../../resources/images/book/10002.jpg"),
    title: "Skintown",
    author: "Skintown",
    src: "/",
    recommended_amount: 30,
    bookId: 1,
  },
  {
    cover: require("../../resources/images/book/10003.jpg"),
    title: "Leonard",
    author: "Leonard",
    src: "/",
    recommended_amount: 40,
    bookId: 2,
  },
  {
    cover: require("../../resources/images/book/10004.jpg"),
    title: "Snow",
    author: "Snow",
    src: "/",
    recommended_amount: 50,
    bookId: 3,
  },
  {
    cover: require("../../resources/images/book/10005.jpg"),
    title: "The Essex",
    author: "The Essex",
    src: "/",
    recommended_amount: 60,
    bookId: 4,
  },
  {
    cover: require("../../resources/images/book/10006.jpg"),
    title: "Skintown",
    author: "Skintown",
    src: "/",
    recommended_amount: 20,
    bookId: 5,
  },
  {
    cover: require("../../resources/images/book/10007.jpg"),
    title: "Leonard",
    author: "Leonard",
    src: "/",
    recommended_amount: 30,
    bookId: 6,
  },
  {
    cover: require("../../resources/images/book/10002.jpg"),
    title: "Skintown",
    author: "Skintown",
    src: "/",
    recommended_amount: 30,
    bookId: 7,
  },
  {
    cover: require("../../resources/images/book/10003.jpg"),
    title: "Leonard",
    author: "Leonard",
    src: "/",
    recommended_amount: 40,
  },
  {
    cover: require("../../resources/images/book/10004.jpg"),
    title: "Snow",
    author: "Snow",
    src: "/",
    recommended_amount: 50,
    bookId: 8,
  },
  {
    cover: require("../../resources/images/book/10005.jpg"),
    title: "The Essex",
    author: "The Essex",
    src: "/",
    recommended_amount: 60,
    bookId: 9,
  },
  {
    cover: require("../../resources/images/book/10006.jpg"),
    title: "Skintown",
    author: "Skintown",
    src: "/",
    recommended_amount: 20,
    bookId: 10,
  },
  {
    cover: require("../../resources/images/book/10007.jpg"),
    title: "Leonard",
    author: "Leonard",
    src: "/",
    recommended_amount: 30,
    bookId: 11,
  },
  {
    cover: require("../../resources/images/book/10008.jpg"),
    title: "Snow",
    author: "Snow",
    src: "/",
    recommended_amount: 10,
    bookId: 12,
  },
  {
    cover: require("../../resources/images/book/10005.jpg"),
    title: "The Essex",
    author: "The Essex",
    src: "/",
    recommended_amount: 60,
    bookId: 13,
  },
  {
    cover: require("../../resources/images/book/10006.jpg"),
    title: "Skintown",
    author: "Skintown",
    src: "/",
    recommended_amount: 20,
    bookId: 14,
  },
  {
    cover: require("../../resources/images/book/10007.jpg"),
    title: "Leonard",
    author: "Leonard",
    src: "/",
    recommended_amount: 30,
    bookId: 15,
  },
  {
    cover: require("../../resources/images/book/10008.jpg"),
    title: "Snow",
    author: "Snow",
    src: "/",
    recommended_amount: 10,
    bookId: 16,
  },
  {
    cover: require("../../resources/images/book/10009.jpg"),
    title: "The Essex",
    author: "The Essex",
    src: "/",
    recommended_amount: 30,
    bookId: 17,
  },
  {
    cover: require("../../resources/images/book/10008.jpg"),
    title: "Snow",
    author: "Snow",
    src: "/",
    recommended_amount: 10,
    bookId: 18,
  },
  {
    cover: require("../../resources/images/book/10009.jpg"),
    title: "The Essex",
    author: "The Essex",
    src: "/",
    recommended_amount: 30,
    bookId: 19,
  },
];

let categoryList = [
  {
    icon: <FileImageOutlined style={{ color: "#ba52fe" }} />,
    title: "Photography",
    bgColor: "#f3ebf8",
  },
  {
    icon: <CoffeeOutlined style={{ color: "#faa432" }} />,
    title: "Food & Drink",
    bgColor: "#f8f3ed",
  },
  {
    icon: <HeartOutlined style={{ color: "#f37970" }} />,
    title: "Romance",
    bgColor: "#f7f1f1",
  },
  {
    icon: <ScissorOutlined style={{ color: "#35d2f6" }} />,
    title: "Health",
    bgColor: "#edf5f8",
  },
  {
    icon: <BookOutlined style={{ color: "#fa5748" }} />,
    title: "Biography",
    bgColor: "#f8f0ee",
  },
];

const Books = () => {
  // Show Carousel
  const dispatch = useDispatch();

  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(true));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  return (
    <>
      <div className="books">
        <div className="container">
          <Category categoryList={categoryList}></Category>
          <TotalBookList bookList={bookList}></TotalBookList>
        </div>
      </div>
    </>
  );
};
export default Books;
