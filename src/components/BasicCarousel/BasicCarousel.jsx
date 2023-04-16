import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom"; // requires a loader

const BasicCarousel = () => {
  const imgArr = [
    {
      url: require("../../resources/images/carousel/book.jpg"),
      path: "/books",
    },
    {
      url: require("../../resources/images/carousel/desk.jpg"),
      path: "/desk",
    },
    {
      url: require("../../resources/images/carousel/library.jpg"),
      path: "/home",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Carousel
        autoPlay
        animationHandler="fade"
        showThumbs={false}
        showStatus={false}
        swipeable={false}
        infiniteLoop={true}
        useKeyboardArrows
        width="100%"
      >
        {imgArr.map((item, index) => (
          <div key={index}>
            <img
              src={item.url}
              alt={item.url}
              onClick={() => navigate(item.path)}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default BasicCarousel;
