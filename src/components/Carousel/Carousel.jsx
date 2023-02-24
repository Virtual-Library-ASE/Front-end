import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const BasicCarousel = (props) => {
  const imgArr = [
    {
      url: require("../../resources/images/carousel/book.jpg"),
    },
    {
      url: require("../../resources/images/carousel/desk.jpg"),
    },
    {
      url: require("../../resources/images/carousel/library.jpg"),
    },
  ];
  return (
    <>
      <Carousel
        autoPlay
        animationHandler="fade"
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        useKeyboardArrows
        width="99vw"
      >
        {imgArr.map((item, index) => (
          <div key={index}>
            <img src={item.url} alt={item.url} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default BasicCarousel;
