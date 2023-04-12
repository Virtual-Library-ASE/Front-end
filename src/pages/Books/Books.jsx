import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";

import { message } from "antd";
import Category from "./Category/Category";
import BookList from "./BookList/BookList";

import { getAllBookApi } from "../../api/api";
import { underscoreToCamelCaseKeysInArray } from "../../resources/js/common";
import "./Books.css";

const Books = () => {
  const dispatch = useDispatch();
  const [totalBookList, setTotalBookList] = useState([]);

  useEffect(() => {
    getAllBookApi()
      .then((res) => {
        if (res.status === 200) {
          setTotalBookList(underscoreToCamelCaseKeysInArray(res.data));
        } else {
          console.log("Error: ", res.msg);
          message.error("Something wrong when getting bookList");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        message.error("Something wrong when getting bookList");
      });
  }, []);

  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(true));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  return (
    <>
      <div className="books">
        <div className="container">
          <Category></Category>
          <BookList bookList={totalBookList}></BookList>
        </div>
      </div>
    </>
  );
};

export default Books;
