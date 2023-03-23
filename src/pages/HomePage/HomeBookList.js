import BookCard from "../../components/BookCard/BookCard";

function HomeBookList(params) {
  const bookList = [
    {
      cover: require("../../resources/images/book/10002.jpg"),
      title: "Skintown",
      bookId: 23,
    },
    {
      cover: require("../../resources/images/book/10003.jpg"),
      title: "Leonard",
      bookId: 24,
    },
    {
      cover: require("../../resources/images/book/10004.jpg"),
      title: "Snow",
      bookId: 25,
    },
    {
      cover: require("../../resources/images/book/10005.jpg"),
      title: "The Essex",
      bookId: 26,
    },
    {
      cover: require("../../resources/images/book/10006.jpg"),
      title: "Skintown",
      bookId: 27,
    },
    {
      cover: require("../../resources/images/book/10007.jpg"),
      title: "Leonard",
      bookId: 28,
    },
    {
      cover: require("../../resources/images/book/10008.jpg"),
      title: "Snow",
      bookId: 29,
    },
    {
      cover: require("../../resources/images/book/10009.jpg"),
      title: "The Essex",
      bookId: 30,
    },
  ];
  return (
    <div className="book-list mt-14">
      <h2 className="text-xl font-bold mb-2">Book Recommended</h2>
      <div className="flex flex-wrap justify-between">
        {bookList.map((item, index) => (
          <BookCard detail={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default HomeBookList;
