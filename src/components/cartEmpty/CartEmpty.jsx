import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../redux/slices/filterSlice";
import cartEmptyImg from "../../img/empty-cart.png";

const CartEmpty = () => {
  const dispatch = useDispatch();

  const backToMain = () => {
    dispatch(resetFilters());
  };

  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина порожня <p>😕</p>
        </h2>
        <p>
          Найімовірніше, ви не замовляли ще піцу.
          <br />
          Щоб замовити піцу, треба перейти на головну сторінку.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" onClick={backToMain} className="button button--black">
          <span>Повернутися на головну</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
