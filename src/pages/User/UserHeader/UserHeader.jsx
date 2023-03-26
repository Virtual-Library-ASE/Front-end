import { Avatar } from "antd";
import "./UserHeader.css";

export default function Header() {
  return (
    <>
      <div className="header relative text-center text-color-white">
        <div className="inner-header flex justify-center items-center text-center h-72 w-full m-0 p-0">
          <div className="user-info">
            <div className="avatar">
              <Avatar
                className=""
                size={128}
                src="https://chenmo1212.cn/file/avatar/spring.png"
              />
            </div>
            <div className="info">
              <h2 className="text-xl mt-2">ChenMo1212</h2>
              <p>Try my best!</p>
            </div>
          </div>
        </div>

        <div>
          <svg
            className="waves relative w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
