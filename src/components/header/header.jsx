import React, { useState } from "react";
import styles from "./header.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
//import { getCarts } from "../../redux/actions/index.js";
import Button from "../button/button.jsx";
import Swal from "sweetalert2";

function Header() {
  const cart = useSelector((state) => state.cart);
  const storageID = 1;
  //const storageID = localStorage.getItem("id");
  const history = useNavigate();
  const [menu, setMenu] = useState(false);
  //const dispatch = useDispatch();
  const location = useLocation();
  const rutasPermitidas = [
    "/",
    "/login",
    "/signUp",
    "/contactUs",
    "/products/:id",
    "/profile",
    "/cart",
  ];

  const esRutaPermitida = rutasPermitidas.some((ruta) => {
    if (ruta.includes(":")) {
      const baseRuta = ruta.split("/:")[0];
      return location.pathname.includes(baseRuta);
    }
    return location.pathname === ruta;
  });

  /*
  useEffect(() => {
    if (storageID) {
      dispatch(getCarts());
    }
  }, [cart, storageID, dispatch]);
  */

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

  const onClickRouteHome = () => {
    history("/");
  };

  const logout = () => {
    localStorage.clear();
    Swal.fire({
      title: "Success!",
      text: "You have successfully logged out",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      history("/");
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
    <div>
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

          {!storageID ? (
            <Button OnClick={onClickRouteLogin} Value="Login" />
          ) : (
            <Button OnClick={onClickRouteProfile} Value="Profile" />
          )}

          {!storageID ? (
            <Button OnClick={onClickRouteSingUp} Value="Sing Up" />
          ) : (
            <Button OnClick={logout} Value="Logout" />
          )}

          {storageID ? (
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

          {storageID ? (
            <div
              className={styles.containerCart}
              style={{ marginLeft: "10px" }}
            >
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

            {!storageID ? (
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

            {!storageID ? (
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

      {esRutaPermitida ? null : (
        <div className={`${styles.bodyRuotes} ${styles.flexDisplay}`}>
          <h1>The URL you are entering is not in use</h1>
          <Button OnClick={onClickRouteHome} Value="Home" />
        </div>
      )}
    </div>
  );
}

export default Header;
