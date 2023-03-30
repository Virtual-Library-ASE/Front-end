import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { LeftOutlined, LikeOutlined } from "@ant-design/icons";

const BookCard = (params) => {
  let bookInfo = params.bookInfo;
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bookCard rounded bg-color-white w-1/6 m-2 shadow cursor-pointer"
        onClick={() => navigate("/book/" + bookInfo.bookId)}
      >
        <img src={bookInfo.cover} alt={bookInfo.title} className="rounded" />
        <div className="info p-2 flex justify-between">
          <div className="left text-xs">
            <div className="title text-sm">{bookInfo.title}</div>
            <div className="author">{bookInfo.author}</div>
          </div>
          <div className="right recommended-amount text-sm leading-10 flex items-center">
            <LikeOutlined style={{ fontSize: 14, color: "#f37970" }} />
            <span className="ml-0.5">{bookInfo.recommended_amount}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const MocCategoryBookList = [
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

const BookList = (params) => {
  let bookList = params.bookList;
  let title = "All Books";
  const navigate = useNavigate();

  // Get route parameters
  const routerParams = useParams();
  const isCategory = JSON.stringify(routerParams) !== "{}";

  // Show Carousel
  const dispatch = useDispatch();
  useEffect(() => {
    if (isCategory) {
      // Show Carousel
      dispatch(setCarouselDisplay(true));
      dispatch(setFooterDisplay(true));
    }
  }, [dispatch]);

  if (isCategory) {
    // Classified book list data
    bookList = MocCategoryBookList;
    title = routerParams.category;
  }

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

        <h2 className="text-xl font-bold my-4">{title}</h2>
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
