import React from "react";
import styles from "./CartItem.module.scss";
import { useDispatch } from "react-redux";
import { addItem, minusItem } from "../../redux/slices/cartSlice";

const CartItem = ({
  id,
  uId,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
  onChange,
}) => {
  const dispatch = useDispatch();

  const setItemId = (uId) => {
    onChange(uId);
  };

  const addPizza = () => {
    dispatch(
      addItem({
        id,
        type,
        size,
      })
    );
  };

  const minusPizza = () => {
    dispatch(
      minusItem({
        uId,
      })
    );
  };

  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.cartItem__img}>
          <img src={imageUrl} alt="Pizza" />
        </div>
        <div className={styles.cartInfo}>
          <h3>{title}</h3>
          <p>
            {type}, {size} см.
          </p>
        </div>
        <div className={styles.cartInfoData}>
          <div className={styles.cartInfoCount}>
            <button
              className={styles.cartInfoCount__buttonMinus}
              onClick={minusPizza}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                ></path>
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                ></path>
              </svg>
            </button>
            <b className={styles.cartInfoCount__text}>{count}</b>
            <button
              className={styles.cartInfoCount__buttonPlus}
              onClick={addPizza}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                ></path>
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                ></path>
              </svg>
            </button>
          </div>
          <div className={styles.cartInfoPrice}>
            <b>{price * count} грн</b>
          </div>
          <div className={styles.cartInfoRemove}>
            <button
              className={styles.cartInfoRemove__button}
              onClick={() => setItemId(uId)}
            >
              Видалити
            </button>
            <button
              className={styles.cartInfoRemove__buttonSvg}
              onClick={() => setItemId(uId)}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                ></path>
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
