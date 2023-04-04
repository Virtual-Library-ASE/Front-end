import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { message, Popover } from "antd";
import { LeftOutlined, LikeOutlined } from "@ant-design/icons";

import { getCategoriesApi } from "../../api/api";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { underscoreToCamelCaseKeysInArray } from "../../resources/js/common";

const BookCard = (params) => {
  let bookInfo = params.bookInfo;
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bookCard rounded bg-color-white m-2 shadow cursor-pointer h-60"
        onClick={() => navigate("/book/" + bookInfo.bookId)}
      >
        <Popover
          content={bookInfo.bookName + " by " + bookInfo.author}
          trigger="hover"
        >
          <div className="card-thumbnail h-3/4">
            <div
              className="h-full"
              style={{
                backgroundImage: "url(" + bookInfo.thumbnail + ")",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <div className="info p-2 flex w-full items-center h-1/4">
            <div className="left text-xs w-4/6">
              <div className="title text-sm ellipsis">{bookInfo.bookName}</div>
              <div className="author ellipsis">{bookInfo.author}</div>
            </div>
            <div className="right recommended-amount text-sm leading-10 flex items-center">
              <LikeOutlined style={{ fontSize: 14, color: "#f37970" }} />
              <span className="ml-0.5">{bookInfo.recommendedAmount}</span>
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
};

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
  }, []);

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
