import React, { useContext } from "react";
import styles from "../Search/Search.module.scss";
import { GoSearch } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { SearchContext } from "../../App";

export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  console.log(searchValue);

  return (
    <div className={styles.input__container}>
      <GoSearch className={styles.input__icon} />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <MdClose
          onClick={() => {
            setSearchValue("");
          }}
          className={styles.input__reset}
        />
      )}
    </div>
  );
}