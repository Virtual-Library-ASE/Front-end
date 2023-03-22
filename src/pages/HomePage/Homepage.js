import "./Homepage.css";
import BookList from "./BookList";
import Reservation from "./Reservation";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { useEffect } from "react";

const Homepage = () => {
  // Show Carousel
  const dispatch = useDispatch();

  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(true));
    dispatch(setFooterDisplay(true));
  }, []);

  return (
    <div className="homepage">
      <Reservation></Reservation>
      <BookList></BookList>
    </div>
  );
};

export default Homepage;
