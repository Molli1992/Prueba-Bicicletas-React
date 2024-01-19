import React from "react";
import styles from "./cardProduct.module.css";

function CardProducts(props) {
  return (
    <div className={styles.bodyCard}>
      <div className={styles.containerCard}>
        <div
          className={styles.cardPicture}
          style={{
            backgroundImage: `url('${props.Img}')`,
          }}
        >
          &nbsp;
        </div>

        <div className={styles.cardDetail}>
          <ul>
            <li>{props.Name}</li>
            <li>Year: {props.Year}</li>
            <li>Price: {props.Price}</li>
          </ul>
        </div>

        <button className={styles.button}>Buy now</button>
      </div>
    </div>
  );
}

export default CardProducts;
