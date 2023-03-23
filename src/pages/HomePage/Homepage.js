import "./Homepage.css";
import HomeBookList from "./HomeBookList";
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
      <HomeBookList></HomeBookList>
    </div>
  );
};

export default Homepage;
