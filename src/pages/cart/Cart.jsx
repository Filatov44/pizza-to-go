import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/cartItem/CartItem";
// import styles from './Cart.module.scss';
import { clearItems } from "../../redux/slices/cartSlice";

import { selectCart } from "../../redux/selectors";
import CartEmpty from "../../components/cartEmpty/CartEmpty";
import CartTop from "../../components/cartTop/CartTop";
import CartBottom from "../../components/cartBottom/CartBottom";

export default function Cart() {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const clearCart = () => {
    if (window.confirm("Ви дійсно бажаєте очистити корзину ?")) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">    
        <CartTop clearCart={clearCart} />
        <div className="content__items-cart">
          {items.map(
            (item) => item.count > 0 && <CartItem key={item.uId} {...item} />
          )}
        </div>
        <CartBottom totalCount={totalCount} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
