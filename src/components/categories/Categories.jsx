import styles from "./Categories.module.scss";

export default function Categories({ value, onChangeCategory }) {
  const categories = [
    "Всі",
    "М'ясні",
    "Вегітаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
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
