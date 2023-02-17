import "./container.css";
import CardImage from "../ImageCard/ImageCard";
import cover from "../../resources/images/book/10002.jpg";

export default function Container() {
  const bookList = [
    {
      cover: require("../../resources/images/book/10002.jpg"),
      title: "Skintown",
    },
    {
      cover: require("../../resources/images/book/10003.jpg"),
      title: "Leonard",
    },
    {
      cover: require("../../resources/images/book/10004.jpg"),
      title: "Snow",
    },
    {
      cover: require("../../resources/images/book/10005.jpg"),
      title: "The Essex",
    },
    {
      cover: require("../../resources/images/book/10006.jpg"),
      title: "Skintown",
    },
    {
      cover: require("../../resources/images/book/10007.jpg"),
      title: "Leonard",
    },
    {
      cover: require("../../resources/images/book/10008.jpg"),
      title: "Snow",
    },
    {
      cover: require("../../resources/images/book/10009.jpg"),
      title: "The Essex",
    },
  ];
  return (
    <div className="container mt-8 flex flex-wrap">
      {bookList.map((item, index) => (
        <CardImage src={item.cover} title={item.title} key={index} />
      ))}
    </div>
  );
}
