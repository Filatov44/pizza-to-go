import React from "react";

import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import SkeletonPizzaBlock from "../components/skeleton/SkeletonPizzaBlock.jsx";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
// import { SearchContext } from "../App";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = useState("asc");
  // const { searchValue } = React.useContext(SearchContext);

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortProperty = useSelector((state) => state.filter.sort.sortProperty);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fakeArray = [...new Array(6)].map(() => (
    <SkeletonPizzaBlock key={uuidv4()} />
  ));

  const isCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const isSearch = searchValue ? `search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://6426c3f6556bad2a5b576f0b.mockapi.io/pizzas?${isCategory}&sortBy=${sortProperty}&order=${order}&${isSearch}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [sortProperty, isCategory, order, isSearch]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort order={order} onChangeOrder={(value) => setOrder(value)} />
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
