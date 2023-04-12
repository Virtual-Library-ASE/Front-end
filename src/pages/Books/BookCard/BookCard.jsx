import { useNavigate } from "react-router-dom";
import { Popover } from "antd";
import { LikeOutlined } from "@ant-design/icons";

const BookCard = ({ bookInfo }) => {
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

export default BookCard;
