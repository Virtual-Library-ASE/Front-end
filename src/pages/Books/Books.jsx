import "./Books.css";
import ImageIcon from "@mui/icons-material/Image";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import BookIcon from "@mui/icons-material/Book";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const Category = () => {
  let categoryList = [
    {
      icon: <ImageIcon style={{ color: "#ba52fe" }} />,
      title: "Photography",
      url: "/",
      bgColor: "#f3ebf8",
    },
    {
      icon: <FastfoodIcon style={{ color: "#faa432" }} />,
      title: "Food & Drink",
      url: "/",
      bgColor: "#f8f3ed",
    },
    {
      icon: <VolunteerActivismIcon style={{ color: "#f37970" }} />,
      title: "Romance",
      url: "/",
      bgColor: "#f7f1f1",
    },
    {
      icon: <MedicationLiquidIcon style={{ color: "#f37970" }} />,
      title: "Health",
      url: "/",
      bgColor: "#edf5f8",
    },
    {
      icon: <BookIcon style={{ color: "#f37970" }} />,
      title: "Biography",
      url: "/",
      bgColor: "#f8f0ee",
    },
  ];

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
            <div className="link text-xs" style={{ color: "#f65d4f" }}>
              <a href={item.url}>Read More ></a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const BookCard = (bookData) => {
  let bookInfo = bookData.bookInfo;
  return (
    <>
      <div className="book rounded bg-color-white w-1/6 m-2 shadow">
        <a href={bookInfo.src}>
          <img src={bookInfo.cover} alt={bookInfo.title} className="rounded" />
          <div className="info p-2 flex justify-between">
            <div className="left text-xs">
              <div className="title text-sm">{bookInfo.title}</div>
              <div className="author">{bookInfo.author}</div>
            </div>
            <div className="right recommended-amount text-sm leading-10">
              <ThumbUpIcon sx={{ fontSize: 14, color: "#f37970" }} />
              <span className="ml-0.5">{bookInfo.recommended_amount}</span>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

const TotalBookList = () => {
  const bookList = [
    {
      cover: require("../../resources/images/book/10002.jpg"),
      title: "Skintown",
      author: "Skintown",
      src: "/",
      recommended_amount: 30,
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
    },
    {
      cover: require("../../resources/images/book/10005.jpg"),
      title: "The Essex",
      author: "The Essex",
      src: "/",
      recommended_amount: 60,
    },
    {
      cover: require("../../resources/images/book/10006.jpg"),
      title: "Skintown",
      author: "Skintown",
      src: "/",
      recommended_amount: 20,
    },
    {
      cover: require("../../resources/images/book/10007.jpg"),
      title: "Leonard",
      author: "Leonard",
      src: "/",
      recommended_amount: 30,
    },
    {
      cover: require("../../resources/images/book/10002.jpg"),
      title: "Skintown",
      author: "Skintown",
      src: "/",
      recommended_amount: 30,
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
    },
    {
      cover: require("../../resources/images/book/10005.jpg"),
      title: "The Essex",
      author: "The Essex",
      src: "/",
      recommended_amount: 60,
    },
    {
      cover: require("../../resources/images/book/10006.jpg"),
      title: "Skintown",
      author: "Skintown",
      src: "/",
      recommended_amount: 20,
    },
    {
      cover: require("../../resources/images/book/10007.jpg"),
      title: "Leonard",
      author: "Leonard",
      src: "/",
      recommended_amount: 30,
    },
    {
      cover: require("../../resources/images/book/10008.jpg"),
      title: "Snow",
      author: "Snow",
      src: "/",
      recommended_amount: 10,
    },
    {
      cover: require("../../resources/images/book/10005.jpg"),
      title: "The Essex",
      author: "The Essex",
      src: "/",
      recommended_amount: 60,
    },
    {
      cover: require("../../resources/images/book/10006.jpg"),
      title: "Skintown",
      author: "Skintown",
      src: "/",
      recommended_amount: 20,
    },
    {
      cover: require("../../resources/images/book/10007.jpg"),
      title: "Leonard",
      author: "Leonard",
      src: "/",
      recommended_amount: 30,
    },
    {
      cover: require("../../resources/images/book/10008.jpg"),
      title: "Snow",
      author: "Snow",
      src: "/",
      recommended_amount: 10,
    },
    {
      cover: require("../../resources/images/book/10009.jpg"),
      title: "The Essex",
      author: "The Essex",
      src: "/",
      recommended_amount: 30,
    },
    {
      cover: require("../../resources/images/book/10008.jpg"),
      title: "Snow",
      author: "Snow",
      src: "/",
      recommended_amount: 10,
    },
    {
      cover: require("../../resources/images/book/10009.jpg"),
      title: "The Essex",
      author: "The Essex",
      src: "/",
      recommended_amount: 30,
    },
  ];
  return (
    <>
      <h2 className="text-xl font-bold my-4">All Books</h2>
      <div className="total-book-list flex flex-wrap justify-between">
        {bookList.map((item, index) => (
          <BookCard bookInfo={item} key={index} />
        ))}
      </div>
    </>
  );
};

const Books = () => {
  return (
    <>
      <div className="books">
        <div className="container">
          <Category></Category>
          <TotalBookList></TotalBookList>
        </div>
      </div>
    </>
  );
};
export default Books;
