import React, { useCallback, useContext, useRef, useState } from "react";
import styles from "../Search/Search.module.scss";

import debounce from "lodash.debounce";
import { GoSearch } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { SearchContext } from "../../App";

export default function Search() {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const resetInputSearch = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log(str);
      setSearchValue(str);
    }, 500),
    []
  );

  return (
    <div className={styles.input__container}>
      <GoSearch className={styles.input__icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <MdClose onClick={resetInputSearch} className={styles.input__reset} />
      )}
    </div>
  );
}
