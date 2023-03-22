import "./Book.css";
import { useParams } from "react-router-dom";
import { setCarouselDisplay } from "../../../store/action";
import { useDispatch } from "react-redux";

const Book = () => {
  // Hide Carousel
  const dispatch = useDispatch();
  setCarouselDisplay(false);
  dispatch(setCarouselDisplay(false));

  // Get route parameters
  const params = useParams();
  console.log(params); // {id: "2",name:"zora"}

  return (
    <>
      <div className="book">
        <div className="container">{params.id}</div>
      </div>
    </>
  );
};
export default Book;
