import React, { useState } from "react";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { getCarts } from "../../redux/actions/index.js";
import Button from "../button/button.jsx";
import Swal from "sweetalert2";

function Header() {
  const cart = useSelector((state) => state.cart);
  const cookie = new Cookies();
  const cookieID = cookie.get("id");
  const history = useNavigate();
  const [menu, setMenu] = useState(false);
  const [stateDispatch, setStateDispatch] = useState(false);
  const dispatch = useDispatch();

  if (cookieID && !stateDispatch) {
    dispatch(getCarts());
    setStateDispatch(true);
  }

  const onClickRouteLogin = () => {
    history("/login");
  };

  const onClickRouteSingUp = () => {
    history("/singUp");
  };

  const onClickRouteProfile = () => {
    history("/profile");
  };

  const onClickRouteCart = () => {
    history("/cart");
  };

  const logout = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      Swal.fire({
        title: "Success!",
        text: "You have successfully logged out",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        history("/");
      });
    });
  };

  const onClickMenu = () => {
    if (!menu) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  return (
    <div className={`${styles.body} ${styles.flexDisplay}`}>
      <div className={`${styles.leftContainer} ${styles.flexDisplay}`}>
        <Link
          className={`${styles.linkHeader} ${styles.linkLeftContainer}`}
          to={"/"}
        >
          BikeBazaar.com
        </Link>
      </div>

      <div className={`${styles.rightContainer} ${styles.flexDisplay}`}>
        <Link
          className={`${styles.linkHeader} ${styles.linkRightContainer}`}
          to={"/"}
        >
          Home
        </Link>
        <Link
          className={`${styles.linkHeader} ${styles.linkRightContainer}`}
          to={"/contactUs"}
        >
          Contact Us
        </Link>

        {!cookieID ? (
          <Button OnClick={onClickRouteLogin} Value="Login" />
        ) : (
          <Button OnClick={onClickRouteProfile} Value="Profile" />
        )}

        {!cookieID ? (
          <Button OnClick={onClickRouteSingUp} Value="Sing Up" />
        ) : (
          <Button OnClick={logout} Value="Logout" />
        )}

        {cookieID ? (
          <div className={styles.containerCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#ffffff"
              class="bi bi-cart"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
              onClick={onClickRouteCart}
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            {cart ? <p>{cart.length}</p> : <p>0</p>}
          </div>
        ) : null}
      </div>

      <div className={`${styles.responsiveContainer}`}>
        {!menu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#ffffff"
            class="bi bi-list"
            viewBox="0 0 16 16"
            onClick={onClickMenu}
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#ffffff"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
            onClick={onClickMenu}
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        )}
      </div>
      {menu ? (
        <div className={`${styles.menu}`}>
          <Link
            className={`${styles.linkHeader} ${styles.linkMenu}`}
            to={"/"}
            onClick={onClickMenu}
          >
            Home
          </Link>

          <Link
            className={`${styles.linkHeader} ${styles.linkMenu}`}
            to={"/contactUs"}
            onClick={onClickMenu}
          >
            Contact Us
          </Link>

          {!cookieID ? (
            <Link
              className={`${styles.linkHeader} ${styles.linkMenu}`}
              to={"/login"}
              onClick={onClickMenu}
            >
              Login
            </Link>
          ) : (
            <Link
              className={`${styles.linkHeader} ${styles.linkMenu}`}
              to={"/profile"}
              onClick={onClickMenu}
            >
              Profile
            </Link>
          )}

          {!cookieID ? (
            <Link
              className={`${styles.linkHeader} ${styles.linkMenu}`}
              to={"/singUp"}
              onClick={onClickMenu}
            >
              Sing Up
            </Link>
          ) : (
            <Link
              className={`${styles.linkHeader} ${styles.linkMenu}`}
              onClick={() => {
                logout();
                onClickMenu();
              }}
            >
              Logout
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Header;
