import "./Books.css";

import Category from "./Category";
import BookList from "./BookList";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { useEffect, useState } from "react";
import { getAllBookApi } from "../../api/api";
import { underscoreToCamelCaseKeysInArray } from "../../resources/js/common";

const Books = () => {
  // Show Carousel
  const dispatch = useDispatch();

  const [totalBookList, setTotalBookList] = useState([]);

  useEffect(() => {
    getAllBookApi()
      .then((res) => {
        if (res.status === 200) {
          setTotalBookList(underscoreToCamelCaseKeysInArray(res.data));
        } else {
          console.log("Error: res.msg");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
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
