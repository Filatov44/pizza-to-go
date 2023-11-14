import styles from "./Categories.module.scss";

export default function Categories({ value, onChangeCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегитарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className={styles.categories}>
      <ul className={styles.categoriesList}>
        {categories.map((category, i) => {
          return (
            <li
              key={category}
              onClick={() => onChangeCategory(i)}
              className={
                value === i
                  ? styles.categoriesItemActive
                  : styles.categoriesItem
              }
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
