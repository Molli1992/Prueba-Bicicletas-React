import React from "react";
import styles from "./button.module.css";

function Button(props) {
  return (
    <button
      className={styles.button}
      onClick={props.OnClick}
      style={{ width: props.Width, height: props.Height }}
    >
      {props.Value}
    </button>
  );
}

export default Button;
