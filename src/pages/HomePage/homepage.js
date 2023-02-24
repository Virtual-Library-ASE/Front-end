import "./homepage.css";
import { Header } from "semantic-ui-react";
import BookList from "./BookList";
import Reservation from "./Reservation";

const HomePage = () => (
  <div className="homepage">
    <Reservation></Reservation>
    <BookList></BookList>
  </div>
);

export default HomePage;
