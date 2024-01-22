import React, { useState, useEffect } from "react";
import styles from "./homePage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "../../components/slider/slider";
import CardProducts from "../../components/cardProducts/cardProducts.jsx";
import ContactUs from "../../components/contactUs/contactUs.jsx";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getCarts } from "../../redux/actions/index.js";

function HomePage() {
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [cards, setCards] = useState(1);
  const [number, setNumber] = useState(1);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (filter === false && products === false) {
      axios
        .get(axiosUrl + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setFilter(res.data);
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
  }, [products, filter, axiosUrl]);

  const onClickLeftArrow = () => {
    if (number === 1) {
      setNumber(3);
      setCards(3);
    } else if (number === 2) {
      setNumber(1);
      setCards(1);
    } else if (number === 3) {
      setNumber(2);
      setCards(2);
    }
  };

  const onClickRightArrow = () => {
    if (number === 1) {
      setNumber(2);
      setCards(2);
    } else if (number === 2) {
      setNumber(3);
      setCards(3);
    } else if (number === 3) {
      setNumber(1);
      setCards(1);
    }
  };

  const handleFilter = (e) => {
    if (!e.target.value) {
      setFilterActive(false);
    } else {
      setFilterActive(true);
      setFilter(
        [...products].filter((i) => {
          return i.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
      );
    }
  };

  const OnClickDetail = (i) => {
    window.scroll(0, 0);
    navigate(`/products/${i.id}`);
  };

  const onClickAddToCart = (i) => {
    if (!userEmail) {
      Swal.fire({
        title: "",
        text: "You must first login",
        icon: "",
        confirmButtonText: "Ok",
      });
    } else {
      let dataPost = {
        productID: i.id,
        userEmail: userEmail,
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

  if (products.length !== 0) {
    return (
      <div className={styles.body}>
        <Slider />

        <div className={`${styles.containerProducts} ${styles.displayFlex}`}>
          <h1>Find your next bicycle</h1>

          <input placeholder="Search your bicycle..." onChange={handleFilter} />

          {!filterActive ? (
            <div className={styles.containerArrows}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
                onClick={onClickLeftArrow}
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>

              <p>{number}</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
                onClick={onClickRightArrow}
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </div>
          ) : null}

          {!filterActive ? (
            <div className={styles.containerCards}>
              {cards === 1 &&
                products &&
                products.map((i, index) => {
                  if (index > 5) {
                    return null;
                  } else {
                    return (
                      <CardProducts
                        Img={i.img}
                        Name={i.name}
                        Year={i.year}
                        Price={i.price}
                        OnClickDetail={() => OnClickDetail(i)}
                        OnClickCart={() => onClickAddToCart(i)}
                      />
                    );
                  }
                })}

              {cards === 2 &&
                products &&
                products.map((i, index) => {
                  if (index > 5 && index < 12) {
                    return (
                      <CardProducts
                        Img={i.img}
                        Name={i.name}
                        Year={i.year}
                        Price={i.price}
                        OnClickDetail={(i) => OnClickDetail(i)}
                        OnClickCart={() => onClickAddToCart(i)}
                      />
                    );
                  } else {
                    return null;
                  }
                })}

              {cards === 3 &&
                products &&
                products.map((i, index) => {
                  if (index > 11) {
                    return (
                      <CardProducts
                        Img={i.img}
                        Name={i.name}
                        Year={i.year}
                        Price={i.price}
                        OnClickDetail={(i) => OnClickDetail(i)}
                        OnClickCart={() => onClickAddToCart(i)}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
          ) : (
            <div className={styles.containerCards}>
              {filter &&
                filter.map((i) => {
                  return (
                    <CardProducts
                      Img={i.img}
                      Name={i.name}
                      Year={i.year}
                      Price={i.price}
                      OnClickDetail={(i) => OnClickDetail(i)}
                      OnClickCart={() => onClickAddToCart(i)}
                    />
                  );
                })}
            </div>
          )}
        </div>

        <ContactUs />
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
