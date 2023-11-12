import React from "react";
import styled from "./cartEmpty.module.scss";
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
      <div className={styled.cart}>
        <h2 className={styled.cart_title}>Корзина порожня</h2>
        <p className={styled.cart__text}>😕</p>
        <p className={styled.cart__text}>
          Найімовірніше, ви не замовляли ще піцу.
        </p>
        <p className={styled.cart__text}>
          Щоб замовити піцу, перейдіть на головну сторінку.
        </p>
        <img className={styled.cart_img} src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" onClick={backToMain} className={styled.button}>
          <span className={styled.button_text}>Повернутися на головну</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
