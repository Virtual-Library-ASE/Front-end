import "./Desks.css";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";

const Desks = () => {
  // Show Carousel
  const dispatch = useDispatch();
  dispatch(setCarouselDisplay(true));
  dispatch(setFooterDisplay(true));

  return <div className="desks">Desks</div>;
};
export default Desks;
