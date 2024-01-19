import React, { useState, useEffect } from "react";
import styles from "./homePage.module.css";
import axios from "axios";
import axiosUrl from "../../axiosUrl.js";
import Slider from "../../components/slider/slider";
import CardProducts from "../../components/cardProducts/cardProducts.jsx";

function HomePage() {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    if (!products) {
      axios
        .get(axiosUrl + "/api/products")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  if (products) {
    return (
      <div className={styles.body}>
        <Slider />

        <div className={`${styles.containerProducts} ${styles.displayFlex}`}>
          <h1>Find your next bicycle</h1>

          <div className={styles.containerCards}>
            {products &&
              products.map((i, index) => {
                if (index > 20) {
                  return null;
                } else {
                  return (
                    <CardProducts
                      Img={i.img}
                      Name={i.name}
                      Year={i.year}
                      Price={i.price}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${styles.bodyLoader} ${styles.displayFlex}`}>
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    );
  }
}

export default HomePage;
