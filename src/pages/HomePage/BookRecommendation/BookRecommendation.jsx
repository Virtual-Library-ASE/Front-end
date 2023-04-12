import BookCard from "./BookCard/BookCard";
import { getBookRecommendListApi } from "../../../api/api";
import { useEffect, useState } from "react";
import { underscoreToCamelCaseKeysInArray } from "../../../resources/js/common";

function BookRecommendation() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    getBookRecommendListApi(20)
      .then((res) => {
        if (res.status === 200) {
          setBookList(underscoreToCamelCaseKeysInArray(res.data));
        } else {
          console.log("Error: res.msg");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <div className="book-list mt-14">
      <h2 className="text-xl font-bold mb-2 mt-4">Recommendation</h2>
      <div className="flex flex-wrap justify-between">
        {bookList.map((item, index) => (
          <BookCard detail={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default BookRecommendation;
