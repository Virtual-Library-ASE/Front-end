import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const BookCard = (params) => {
  let bookInfo = params.bookInfo;
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

const BookList = (params) => {
  let bookList = params.bookList;
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

export default BookList;
