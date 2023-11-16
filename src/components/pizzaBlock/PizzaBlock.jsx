import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./PizzaBlock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

const typeName = ["тонке", "традиційне"];

export default function PizzaBlock(props) {
  const dispatch = useDispatch();

  const [typeActive, setTypeActive] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (obj) =>
        obj.id === props.id &&
        obj.type === typeName[typeActive] &&
        obj.size === props.sizes[activeSize]
    )
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const pizzaPrice = Number(props.price[activeSize]);

  const onClickAdd = () => {
    const item = {
      id: props.id,
      title: props.title,
      price: pizzaPrice,
      imageUrl: props.imageUrl,
      type: typeName[typeActive],
      size: props.sizes[activeSize],
      index: activeSize,
    };
    dispatch(addItem(item));
  };

  return (
    <div className={styles.pizzaBlockWrapper}>
      <div className={styles.pizzaBlock}>
        <img
          className={styles.pizzaBlockImg}
          src={props.imageUrl}
          alt="Pizza"
        />
        <h4 className={styles.pizzaBlockTitle}>{props.title}</h4>
        <div className={styles.pizzaBlockSelector}>
          <ul className={styles.pizzaBlockList}>
            {props.types.map((type, i) => {
              return (
                <li
                  key={uuidv4()}
                  onClick={() => setTypeActive(type)}
                  className={
                    typeActive === i
                      ? styles.pizzaBlockItemActive
                      : styles.pizzaBlockItem
                  }
                >
                  {typeName[type]}
                </li>
              );
            })}
          </ul>
          <ul className={styles.pizzaBlockList}>
            {props.sizes.map((size, i) => {
              return (
                <li
                  key={uuidv4()}
                  onClick={() => setActiveSize(i)}
                  className={
                    activeSize === i
                      ? styles.pizzaBlockItemActive
                      : styles.pizzaBlockItem
                  }
                >
                  {size}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">
            {" "}
            {props.price[activeSize]} грн
          </div>
          <button onClick={onClickAdd} className={styles.pizzaBlockButton}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span className={styles.pizzaBlockButton__text}>Додати</span>
            {addedCount > 0 && (
              <i className={styles.pizzaBlockButton__count}>{addedCount}</i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
