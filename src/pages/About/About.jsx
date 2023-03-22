import "./About.css";
import { useDispatch } from "react-redux";
import { setCarouselDisplay, setFooterDisplay } from "../../store/action";
const About = () => {
  // Show Carousel
  const dispatch = useDispatch();
  dispatch(setCarouselDisplay(false));
  dispatch(setFooterDisplay(false));

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
              <div className="frontContent-img">
                <img
                  src={require("../../resources/images/team.jpg")}
                  alt=""
                  className="img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
