import React, { useState } from "react";
import styles from "./slider.module.css";
import img1 from "../../img/img-1-slider.jpg";
import img2 from "../../img/img-2-slider.jpg";
import img3 from "../../img//img-3-slider.jpg";

function Slider() {
  const [img, setImg] = useState(img1);
  const [number, setNumber] = useState(1);

  const sliderTimeOut = () => {
    setTimeout(() => {
      if (number === 1) {
        setImg(img2);
        setNumber(2);
      }
      if (number === 2) {
        setImg(img3);
        setNumber(3);
      }
      if (number === 3) {
        setImg(img1);
        setNumber(1);
      }
    }, "5000");
  };

  sliderTimeOut();

  return (
    <div className={styles.body}>
      <img src={img} alt="Error loading IMG" />

      <h1>Ride the Difference - Experience Quality Cycling</h1>
    </div>
  );
}

export default Slider;
