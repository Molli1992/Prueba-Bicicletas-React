import React, { useState, useEffect } from "react";
import styles from "./cardDetailPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosUrl from "../../axiosUrl";
import Swal from "sweetalert2";

function CardDetailPage() {
  const { id } = useParams();
  const [card, setCard] = useState(false);
  const url = `${axiosUrl}/products/${id}`;

  useEffect(() => {
    if (!card) {
      axios
        .get(`${axiosUrl}/api/products/${id}`)
        .then((res) => {
          setCard(res.data);
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  }, []);

  if (card) {
    console.log(card);
    return (
      <div className={styles.body}>
        <div className={styles.cardDetail}>
          <div className={styles.containerLeft}>
            <img src={card.img} alt="Error" />
          </div>
          <div className={styles.containerRight}>
            <h1>{card.description}</h1>
            <h2>Price: {card.price}</h2>
            <h2>Year: {card.year}</h2>
            <h2>Use time: {card.time}</h2>
            <div className={styles.buttonsContainer}>
              <button>Buy now</button>
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.body}>
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    );
  }
}

export default CardDetailPage;
