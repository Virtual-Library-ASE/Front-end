import "./BookCard.scoped.css";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";

function BookCard(props) {
  const detail = props.detail;
  const navigate = useNavigate();

  return (
    <div className="book-card cursor-pointer my-2">
      <figure className="figure inline-block relative text-center w-full overflow-hidden bg-color-white h-72">
        <div
          className="home-book-thumbnail h-full"
          style={{
            backgroundImage: "url(" + detail.thumbnail + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="cover w-full absolute top-1/2">
          <Popover content={detail.bookName} trigger="hover">
            <figcaption className="text-sm py-2 px-1 absolute left-1/2 overflow-hidden w-10/12 h-8">
              <h3 className="title font-bold overflow-hidden ellipsis">
                {detail.bookName}
              </h3>
              <h3
                className="hover font-bold"
                onClick={() => navigate("/book/" + detail.bookId)}
              >
                Read
              </h3>
            </figcaption>
          </Popover>
        </div>
      </figure>
    </div>
  );
}

export default BookCard;
