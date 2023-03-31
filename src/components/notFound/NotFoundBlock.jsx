import React from 'react';
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.info}>😒</div>
          <p className={styles.text}>Страница не найдена</p>
          <Link className={styles.link} to="/">
            Нажмите для возврата на главную страницу
          </Link>
        </div>
      </>
    );
}


