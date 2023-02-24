import "./Homepage.css";
import BookList from "./BookList";
import Reservation from "./Reservation";

const Homepage = () => (
  <div className="homepage">
    <Reservation></Reservation>
    <BookList></BookList>
  </div>
);

export default Homepage;
