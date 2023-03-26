import "./BubblyBtn.css";
import { useState } from "react";

export default function BubblyBtn(params) {
  const [isAnimate, setAnimate] = useState(false);
  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(function () {
      setAnimate(false);
    }, 700);

    params.handleEvent();
  };
  const btnStyle = {
    padding: params.padding ? params.padding : "0.2rem 0.5rem",
    margin: params.margin ? params.margin : "0.5rem",
  };

  return (
    <>
      <button
        style={btnStyle}
        className={"bubbly-button " + (isAnimate ? "animate" : "")}
        onClick={handleAnimate}
      >
        {params.text}
      </button>
    </>
  );
}
