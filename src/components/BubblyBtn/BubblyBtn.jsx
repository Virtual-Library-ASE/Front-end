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

  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
        timerId = null;
      }, delay);
    };
  };

  return (
    <>
      <button
        style={btnStyle}
        disabled={params.disabled}
        className={
          "bubbly-button " +
          (params.disabled ? "isActive " : "active ") +
          (isAnimate ? "animate" : "")
        }
        onClick={debounce(handleAnimate, 300)}
      >
        {params.text}
      </button>
    </>
  );
}
