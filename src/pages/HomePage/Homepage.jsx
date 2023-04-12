import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";

import BookRecommendation from "./BookRecommendation/BookRecommendation";
import Reservation from "./Reservation/Reservation";
import "./Homepage.css";

const Homepage = () => {
  // Show Carousel
  const dispatch = useDispatch();

  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(true));
    dispatch(setFooterDisplay(true));
  }, [dispatch]);

  return (
    <div className="homepage">
      <Reservation></Reservation>
      <BookRecommendation></BookRecommendation>
    </div>
  );
};

export default Homepage;
