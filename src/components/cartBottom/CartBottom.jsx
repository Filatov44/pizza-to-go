import React from 'react';
import { Link } from "react-router-dom";
import styled from './CartBottom.module.scss';

export default function CartBottom({ totalCount, totalPrice }) {
  return (
    <div className={styled.cartBottom}>
      <div className={styled.cartBottom__details}>
        <span className={styled.cartBottom__text}>
          Загальна кількість:
          <b className={styled.cartBottom__num}>{totalCount} шт.</b>
        </span>
        <span className={styled.cartBottom__text}>
          Сума замовлення:
          <b className={styled.cartBottom__price}>{totalPrice} грн</b>
        </span>
      </div>
      <div className={styled.cartBottom__wrapperButton}>
        <Link to="/" className={styled.cartBottom__backButton}>
          <span className={styled.cartBottom__backButtonText}>
            Повернутися назад
          </span>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Link>
        <Link className={styled.cartBottom__payButton}>
          <div className={styled.cartBottom__payButtonText}>Оплатити зараз</div>
        </Link>
      </div>
    </div>
  );
}
