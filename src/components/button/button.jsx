import React from "react";
import styles from "./button.module.css";

function Button(props) {
  return (
    <button className={styles.button} onClick={props.OnClick}>
      {props.Value}
    </button>
  );
}

export default Button;
