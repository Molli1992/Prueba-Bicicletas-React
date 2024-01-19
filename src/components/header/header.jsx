import React, { useState } from "react";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const history = useNavigate();
  const [menu, setMenu] = useState(false);

  const onClickRouteLogin = () => {
    history("/login");
  };

  const onClickRouteSingUp = () => {
    history("/singUp");
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
          Booking.com
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
        <button onClick={onClickRouteLogin}>Login</button>
        <button onClick={onClickRouteSingUp}>Sing Up</button>
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

          <Link
            className={`${styles.linkHeader} ${styles.linkMenu}`}
            to={"/login"}
            onClick={onClickMenu}
          >
            Login
          </Link>

          <Link
            className={`${styles.linkHeader} ${styles.linkMenu}`}
            to={"/singUp"}
            onClick={onClickMenu}
          >
            Sing Up
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
