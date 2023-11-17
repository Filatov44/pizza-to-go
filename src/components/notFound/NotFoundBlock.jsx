import React from 'react';
import { Link } from "react-router-dom";
import backImg from "../../img/backArrow.png";
import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.info}>😒</div>
          <p className={styles.text}>Сторінка не знайдена</p>
          <p className={styles.text__sub}>
            Натисніть на стрілку нижче , щоб повернутися на головну сторінку
          </p>
          <Link className={styles.link} to="/">
            <img className={styles.img} src={backImg} alt='назад' />
          </Link>
        </div>
      </>
    );
}


