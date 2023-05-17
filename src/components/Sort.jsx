import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

export default function Sort({ value, onChangeSort, onChangeOrder, order }) {
  const [open, setOpen] = useState(false);

  const list = [
    { name: "популярности", sortProperty: "rating" },
    { name: "цене", sortProperty: "price" },
    { name: "алфавиту", sortProperty: "title" },
  ];

  const onSelectedSort = (i) => {
    onChangeSort(i);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          className="sort__label-svg"
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
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
        <div className="sort__button">
          <button
            type="button"
            className={
              order === "asc" ? "sort__button-item active" : "sort__button-item"
            }
            onClick={() => onChangeOrder("asc")}
          >
            <BsArrowUp className="sort__button-svg" />
          </button>
          <button
            type="button"
            className={
              order === "desc"
                ? "sort__button-item active"
                : "sort__button-item"
            }
            onClick={() => onChangeOrder("desc")}
          >
            <BsArrowDown />
          </button>
        </div>
      </div>
      <div className={open ? "active sort__popup" : "sort__popup"}>
        {open && (
          <ul>
            {list.map((obj, i) => {
              return (
                <li
                  key={uuidv4()}
                  onClick={() => onSelectedSort(obj)}
                  className={
                    value.sortProperty === obj.sortProperty ? "active" : ""
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
