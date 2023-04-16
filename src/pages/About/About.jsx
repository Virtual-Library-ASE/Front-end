import "./About.css";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
import { useEffect } from "react";
const About = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Show Carousel
    dispatch(setCarouselDisplay(false));
    dispatch(setFooterDisplay(false));
  }, [dispatch]);

  const teamList = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.jpg", "8.jpg"]

  return (
    <>
      <div className="frontFace">
        <div className="frontFace-container">
          <div className="frontContent">
            <div className="frontContent-sentence">
              <div className="frontContent-title">
                <p className="frontContent-title-main">About US</p>
                <p className="frontContent-text">
                  Our team is from Trinity College Dublin(TCD), and this website
                  is currently a project of the ASE (Advanced Software
                  Engineering) module. We use VR equipment to develop a Virtual
                  Library project. This is the web version of this project. With
                  the purpose of providing users with more convenient virtual
                  library services, the immersive experience of VR equipment can
                  allow users to be on the scene. Our team members come from
                  China and India, with rich technical experience and creative
                  thinking on problem solving. This is where we will use this
                  knowledge to build a powerful virtual library system designed
                  to provide users with a better experience.
                </p>
              </div>
              <div className="member-avatars">
                {
                  teamList.map((item, index) => (
                    <img
                      key={index}
                      src={require("../../resources/images/about/" + item)}
                      alt=""
                      className="img"
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
