import React, { useState } from "react";
import styles from "./slider.module.css";

function Slider() {
  const [img, setImg] = useState(
    "https://darpedales.com/wp-content/uploads/2020/01/11133.jpg"
  );
  const [number, setNumber] = useState(1);

  const sliderTimeOut = () => {
    setTimeout(() => {
      if (number === 1) {
        setImg(
          "https://www.elconfidencialdigital.com/asset/thumbnail,1280,720,center,center/media/elconfidencialdigital/images/2021/02/22/2021022212191374040.jpg"
        );
        setNumber(2);
      }
      if (number === 2) {
        setImg("https://tuvalum.com/blog/wp-content/uploads/2015/08/mountain-bike-por-el-bosque-1.jpg");
        setNumber(3);
      }
      if (number === 3) {
        setImg(
          "https://darpedales.com/wp-content/uploads/2020/01/11133.jpg"
        );
        setNumber(1);
      }
    }, "5000");
  };

  sliderTimeOut()

  return (
    <div className={styles.body}>
      <img src={img} alt="Error loading IMG" />

      <h1>Ride the Difference - Experience Quality Cycling</h1>
    </div>
  );
}

export default Slider;
