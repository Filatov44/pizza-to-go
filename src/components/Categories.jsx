// import { useState } from "react";

export default function Categories({value, onChangeCategory}) {
  // const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегитарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  // const onChangeCategory = (index) => {
  //   setActiveCategory(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={category}
              onClick={() => onChangeCategory(i)}
              className={value === i ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
