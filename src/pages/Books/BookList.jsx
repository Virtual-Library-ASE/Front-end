import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LeftOutlined, LikeOutlined } from "@ant-design/icons";
import { getCategoriesApi } from "../../api/api";
import { underscoreToCamelCaseKeysInArray } from "../../resources/js/common";

const BookCard = (params) => {
  let bookInfo = params.bookInfo;
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bookCard rounded bg-color-white w-1/6 m-2 shadow cursor-pointer"
        onClick={() => navigate("/book/" + bookInfo.bookId)}
      >
        <img
          src={bookInfo.thumbnail}
          alt={bookInfo.bookName}
          className="rounded"
        />
        <div className="info p-2 flex justify-between">
          <div className="left text-xs">
            <div className="title text-sm">{bookInfo.bookName}</div>
            <div className="author">{bookInfo.author}</div>
          </div>
          <div className="right recommended-amount text-sm leading-10 flex items-center">
            <LikeOutlined style={{ fontSize: 14, color: "#f37970" }} />
            <span className="ml-0.5">{bookInfo.recommendedAmount}</span>
          </div>
        </div>
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

  useEffect(() => {
    if (isCategory) {
      getCategoriesApi(routerParams.category).then((res) => {
        if (res.status === 200) {
          setBookList(underscoreToCamelCaseKeysInArray(res.data));
        } else {
          console.log("Something wrong when getting bookList");
        }
      });
    }
  }, []);

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
        <div className="total-book-list flex flex-wrap justify-between">
          {bookList.map((item, index) => (
            <BookCard bookInfo={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;
