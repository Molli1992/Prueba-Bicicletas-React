import React from "react";
import styles from "./cartPage.module.css";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { getCarts } from "../../redux/actions/index.js";
import axios from "axios";
import Button from "../../components/button/button.jsx";
import { useNavigate } from "react-router-dom";

function CartPage() {
  window.scroll(0, 0);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  var count = 0;

  if (!userEmail) {
    Swal.fire({
      title: "Error!",
      text: "You must first login",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
    });
  }

  const onClickDeleteCart = (i) => {
    axios
      .delete(`${axiosUrl}/api/cart/${i.cartID}`)
      .then(() => {
        dispatch(getCarts());
        Swal.fire({
          title: "Success!",
          text: "Cart successfully deleted",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const onClickBuyNow = () => {
    axios
      .delete(`${axiosUrl}/api/allCarts/${userEmail}`)
      .then(() => {
        dispatch(getCarts());
        Swal.fire({
          title: "Success!",
          text: "Successful purchase!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/");
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Error when making purchase",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const onClickCleanCart = () => {
    axios
      .delete(`${axiosUrl}/api/allCarts/${userEmail}`)
      .then(() => {
        dispatch(getCarts());
        Swal.fire({
          title: "Success!",
          text: "All carts deleted",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  if (cart.length !== 0) {
    return (
      <div className={styles.body}>
        {cart &&
          cart.map((i) => {
            count = count + i.productPrice;

            return (
              <div class="card" style={{ width: "90%", margin: "10px 0px" }}>
                <div
                  class="card-header"
                  style={{ fontWeight: "bold", fontSize: "30px" }}
                >
                  {i.productName}
                </div>
                <div class="card-body">
                  <h5 class="card-title">{i.productDescription}</h5>
                  <p class="card-text">Price: ${i.productPrice}</p>
                  <button
                    class="btn btn-primary"
                    onClick={() => onClickDeleteCart(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}

        <div className={styles.containerButton}>
          <Button OnClick={onClickBuyNow} Value="Buy now" />
          <Button OnClick={onClickCleanCart} Value="Clean cart" />
          <p>Final price: ${count}</p>
        </div>
      </div>
    );
  } else
    return (
      <div className={styles.body}>
        <h1>The cart is empty</h1>
      </div>
    );
}

export default CartPage;
