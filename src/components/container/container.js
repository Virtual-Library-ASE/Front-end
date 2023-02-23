import "./container.css";
import BookCard from "../BookCard/BookCard";
import { Header } from "semantic-ui-react";
import { Image } from "semantic-ui-react";
import book from "../../resources/images/reservation/book.jpg";

const ImageCard = ({ url, text }) => {
  return (
    <div className="item relative w-1/2 overflow-hidden">
      <img src={url} alt={url} className="rounded cursor-default" />
      <div className="btn absolute overflow-hidden w-2/5 h-24 p-1 top-1/2 left-1/2 text-3xl font-bold text-center rounded cursor-pointer">
        {text}
      </div>
    </div>
  );
};

function Reservation() {
  const book = require("../../resources/images/reservation/book.jpg");
  const desk = require("../../resources/images/reservation/desk.jpg");
  return (
    <div className="reservation">
      <Header size="large">Start Reading</Header>
      <div className="flex px-2">
        <ImageCard url={book} text="Book a desk"></ImageCard>
        <ImageCard url={desk} text="Rent a book"></ImageCard>
      </div>
    </div>
  );
}

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
      <Header size="large">Book Recommended</Header>
      <div className="flex flex-wrap justify-between">
        {bookList.map((item, index) => (
          <BookCard src={item.cover} title={item.title} key={index} />
        ))}
      </div>
    </div>
  );
}

const Container = () => (
  <div className="container">
    <Reservation></Reservation>
    <BookList></BookList>
  </div>
);

export default Container;
