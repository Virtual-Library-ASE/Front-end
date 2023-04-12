import { useNavigate } from "react-router-dom";

const ImageCard = ({ url, text, path }) => {
  const navigate = useNavigate();
  return (
    <div className="item relative w-1/2 overflow-hidden">
      <img src={url} alt={url} className="rounded cursor-default" />
      <div
        className="btn absolute overflow-hidden w-2/5 h-14 p-1 top-1/2 left-1/2 text-xl font-bold text-center rounded cursor-pointer"
        onClick={() => navigate(path)}
      >
        {text}
      </div>
    </div>
  );
};

const reservationList = [
  {
    url: require("../../../resources/images/reservation/book.jpg"),
    text: "Rent a seat",
    path: "/books",
  },
  {
    url: require("../../../resources/images/reservation/desk.jpg"),
    text: "Rent a book",
    path: "/desks",
  },
];

function Reservation() {
  return (
    <div className="reservation">
      <h2 className="text-xl font-bold mb-2 mt-4">Reservation</h2>
      <div className="flex px-2 justify-between">
        {reservationList.map((item, index) => (
          <ImageCard
            key={index}
            url={item.url}
            text={item.text}
            path={item.path}
          ></ImageCard>
        ))}
      </div>
    </div>
  );
}

export default Reservation;
