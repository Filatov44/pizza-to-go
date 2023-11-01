import React from "react";
import { Link } from "react-router-dom";
import cartEmptyImg from "../../img/empty-cart.png";

const CartEmpty = () => {
  return (
    <>
      <div class="cart cart--empty">
        <h2>
          Корзина порожня <icon>😕</icon>
        </h2>
        <p>
          Найімовірніше, ви не замовляли ще піцу.
          <br />
          Щоб замовити піцу, треба перейти на головну сторінку.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" class="button button--black">
          <span>Повернутися на головну</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
