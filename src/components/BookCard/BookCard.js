import "./BookCard.css";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
  const detail = props.detail;
  const navigate = useNavigate();

  return (
    <div className="card cursor-pointer w-1/5 mx-2">
      <figure className="figure">
        <img
          src={detail.cover}
          className="max-w-full align-top"
          alt="book-cover"
        />
        <div className="cover">
          <figcaption className="text-sm">
            <h3 className="title font-normal leading-none"> {detail.title}</h3>
            <h3
              className="hover"
              onClick={() => navigate("/book/" + detail.bookId)}
            >
              Read
            </h3>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}

export default BookCard;
