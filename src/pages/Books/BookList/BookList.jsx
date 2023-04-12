import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import BookCard from "../BookCard/BookCard";

import { getCategoriesApi } from "../../../api/api";
import { setCarouselDisplay, setFooterDisplay } from "../../../store/action";
import { underscoreToCamelCaseKeysInArray } from "../../../resources/js/common";

const BookList = (params) => {
  const navigate = useNavigate();

  // Get route parameters
  const routerParams = useParams();
  const isCategory = JSON.stringify(routerParams) !== "{}";
  let bookListTitle = isCategory ? routerParams.category : "All Books";

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    setBookList(params.bookList || []);
  }, [params.bookList]);

  // Get category book list
  useEffect(() => {
    if (isCategory) {
      getCategoriesApi(routerParams.category).then((res) => {
        if (res.status === 200) {
          setBookList(underscoreToCamelCaseKeysInArray(res.data));
        } else {
          console.log("Something wrong when getting bookList: ", res.msg);
          message.error("Something wrong when getting bookList");
        }
      });
    }
  }, [isCategory, routerParams.category]);

  // Show Carousel
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCarouselDisplay(true));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  return (
    <>
      <div className="book-list">
        {isCategory ? (
          <div className="return p-3">
            <div
              className="iconBox cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <LeftOutlined className="text-2xl" />
            </div>
          </div>
        ) : (
          ""
        )}

        <h2 className="text-xl font-bold mb-2 mt-4">{bookListTitle}</h2>
        <div className="total-book-list flex flex-wrap">
          {bookList.map((item, index) => (
            <BookCard bookInfo={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;
