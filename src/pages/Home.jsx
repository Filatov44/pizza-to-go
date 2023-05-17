import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import SkeletonPizzaBlock from "../components/skeleton/SkeletonPizzaBlock.jsx";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { SearchContext } from "../App";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [order, setOrder] = useState("asc");
  const { searchValue } = React.useContext(SearchContext);
  console.log(searchValue);

  const fakeArray = [...new Array(6)].map(() => (
    <SkeletonPizzaBlock key={uuidv4()} />
  ));

  const isCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const isSearch = searchValue ? `search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6426c3f6556bad2a5b576f0b.mockapi.io/pizzas?${isCategory}&sortBy=${sortType.sortProperty}&order=${order}&${isSearch}`
    )
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        setPizzas(items);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [sortType, isCategory, order, isSearch]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={(i) => setCategoryId(i)}
          />
          <Sort
            value={sortType}
            onChangeSort={(i) => setSortType(i)}
            order={order}
            onChangeOrder={(value) => setOrder(value)}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? fakeArray
            : pizzas.map((pizza) => {
                return <PizzaBlock key={uuidv4()} {...pizza} />;
              })}
        </div>
      </div>
    </>
  );
}
