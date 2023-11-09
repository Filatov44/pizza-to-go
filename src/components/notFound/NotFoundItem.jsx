import React from "react";
import pizzaItem from "../../img/pizzaItemNotFound.jpg";
import styles from "./NotFoundItem.module.scss";

export default function NotFoundItem() {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.text}>
          На жаль піцца з такою назвою не знайдена 😒
        </p>
        {/* <div className={styles.wrapper_img}>
          <img className={styles.img} src={pizzaItem} alt="Not found pizza" />
        </div> */}
        <img className={styles.img} src={pizzaItem} alt="Not found pizza" />
      </div>
    </>
  );
}
