import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import sortList from "../../assets/sortList";
import styles from "./Sort.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../../redux/slices/filterSlice";
import { selectSort } from "../../redux/selectors";

export default function Sort({ onChangeOrder, order }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef();

  const list = sortList;

  const onSelectedSort = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const clickOutsideSort = (event) => {
      if (!sortRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", clickOutsideSort);

    return () => {
      document.body.removeEventListener("click", clickOutsideSort);
    };
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sortLabel}>
        <svg
          className={styles.sortLabel__svg}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b className={styles.sortTitle}>Сортувати за:</b>
        <span className={styles.sortText} onClick={() => setOpen(!open)}>
          {sort.name}
        </span>
        <div className={styles.sortButtonList}>
          <button
            type="button"
            className={
              order === "asc"
                ? styles.sortButtonItem__active
                : styles.sortButtonItem
            }
            onClick={() => onChangeOrder("asc")}
          >
            <BsArrowUp className="sort__button-svg" />
          </button>
          <button
            type="button"
            className={
              order === "desc"
                ? styles.sortButtonItem__active
                : styles.sortButtonItem
            }
            onClick={() => onChangeOrder("desc")}
          >
            <BsArrowDown />
          </button>
        </div>
      </div>
      <div
        className={open ? styles.sortPopup__active : styles.sortPopup}
      >
        {open && (
          <ul className={styles.sortPopupList}>
            {list.map((obj, i) => {
              return (
                <li
                  key={uuidv4()}
                  onClick={() => onSelectedSort(obj)}
                  className={
                    sort.sortProperty === obj.sortProperty
                      ? styles.sortPopupItem__active
                      : styles.sortPopupItem
                  }
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
