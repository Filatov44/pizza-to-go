import React, { useContext, useRef } from "react";
import styles from "../Search/Search.module.scss";

import { GoSearch } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { SearchContext } from "../../App";

export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();
  console.log(searchValue);

  const changeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const resetInputSearch = () => {
    setSearchValue("");
    inputRef.current.focus()
  }

  return (
    <div className={styles.input__container}>
      <GoSearch className={styles.input__icon} />
      <input
        ref={inputRef}
        value={searchValue}
        onChange={changeHandler}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <MdClose
          onClick={
           resetInputSearch
          }
          className={styles.input__reset}
        />
      )}
    </div>
  );
}
