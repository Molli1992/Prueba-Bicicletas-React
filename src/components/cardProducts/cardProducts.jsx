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
            <li>Price: ${props.Price}</li>
          </ul>
        </div>

        <div className={styles.containerButtons}>
          <button className={styles.button} onClick={props.OnClickCart}>Add to cart</button>
          <button className={styles.button} onClick={props.OnClickDetail}>See details</button>
        </div>
      </div>
    </div>
  );
}

export default CardProducts;
