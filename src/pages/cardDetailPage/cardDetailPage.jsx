import React, { useState, useEffect } from "react";
import styles from "./cardDetailPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../components/button/button.jsx";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { getCarts } from "../../redux/actions/index.js";

function CardDetailPage() {
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const { id } = useParams();
  const [card, setCard] = useState(false);
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const cookieID = cookie.get("id");

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
  }, [axiosUrl, card, id]);

  const onClickRepair = () => {
    Swal.fire({
      title: "Error!",
      text: "In repair",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  const onClickAddToCart = () => {
    if (!cookieID) {
      Swal.fire({
        title: "Error!",
        text: "You must first login",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      let dataPost = {
        productID: card.id,
        userID: cookieID,
      };

      axios
        .post(axiosUrl + "/api/cart", dataPost)
        .then(() => {
          dispatch(getCarts());
          Swal.fire({
            title: "Success!",
            text: "Product added to cart",
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: "Product selection error try again later",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  };

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
            <p>{card.information}</p>
            <div className={styles.buttonsContainer}>
              <Button OnClick={onClickRepair} Value="Buy now" />
              <Button OnClick={onClickAddToCart} Value="Add to cart" />
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
