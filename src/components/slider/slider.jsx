import React, { useState } from "react";
import styles from "./slider.module.css";
import img1 from "../../img/img-slider-1.jpg";
import img2 from "../../img/img-slider-2.jpg";
import img3 from "../../img/img-slider-3.jpg";

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
      <div
        className={styles.containerImg}
        style={{ backgroundImage: `url(${img})` }}
      >
        <h1>Ride the Difference - Experience Quality Cycling</h1>
      </div>
    </div>
  );
}

export default Slider;
