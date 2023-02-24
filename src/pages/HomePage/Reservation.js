import { Header } from "semantic-ui-react";
import book from "../../resources/images/reservation/book.jpg";
import desk from "../../resources/images/reservation/desk.jpg";

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
      <Header size="medium">Start Reading</Header>
      <div className="flex px-2">
        <ImageCard url={book} text="Book a desk"></ImageCard>
        <ImageCard url={desk} text="Rent a book"></ImageCard>
      </div>
    </div>
  );
}

export default Reservation;
