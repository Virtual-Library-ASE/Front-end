import { Header } from "semantic-ui-react";
import BookCard from "../../components/BookCard/BookCard";

function BookList() {
  const bookList = [
    {
      cover: require("../../resources/images/book/10002.jpg"),
      title: "Skintown",
    },
    {
      cover: require("../../resources/images/book/10003.jpg"),
      title: "Leonard",
    },
    {
      cover: require("../../resources/images/book/10004.jpg"),
      title: "Snow",
    },
    {
      cover: require("../../resources/images/book/10005.jpg"),
      title: "The Essex",
    },
    {
      cover: require("../../resources/images/book/10006.jpg"),
      title: "Skintown",
    },
    {
      cover: require("../../resources/images/book/10007.jpg"),
      title: "Leonard",
    },
    {
      cover: require("../../resources/images/book/10008.jpg"),
      title: "Snow",
    },
    {
      cover: require("../../resources/images/book/10009.jpg"),
      title: "The Essex",
    },
  ];
  return (
    <div className="book-list mt-14">
      <Header size="medium">Book Recommended</Header>
      <div className="flex flex-wrap">
        {bookList.map((item, index) => (
          <BookCard src={item.cover} title={item.title} key={index} />
        ))}
      </div>
    </div>
  );
}

export default BookList;
