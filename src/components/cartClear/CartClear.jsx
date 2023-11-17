import React from "react";
import styles from "./CartClear.module.scss";
import clearCardImg from "../../img/pizza-in-box.jpg";

export default function CartClear() {
  return (
    <>
      <h2 className={styles.modal__title}>Ви дійсно бажаєте очистити кошик?</h2>
      <img className={styles.modal__img} src={clearCardImg} alt="Pizza" />
    </>
  );
}
