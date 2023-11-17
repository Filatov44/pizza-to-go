import React from "react";
import styles from "./DeleteModalItems.module.scss";

export default function DeleteModalItems({
  imageUrl,
  title,
  type,
  size,
  count,
  price,
}) {
  return (
    <>
      <h2 className={styles.modal__title}>
        Ви дійсно бажаєте видалити цю позицію?
      </h2>
      <img className={styles.modal__img} src={imageUrl} alt="Pizza" />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.sub__title}>
        {type}, {size} см.
      </p>
      <div className={styles.info}>
        <b className={styles.info__count}>Кількість: {count} шт.</b>
        <b className={styles.info__price}>Вартість: {price * count} грн</b>
      </div>
    </>
  );
}
