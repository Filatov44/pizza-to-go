import React, { useRef } from "react";

import axios from "axios";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import SkeletonPizzaBlock from "../components/skeleton/SkeletonPizzaBlock.jsx";
import sortList from "../assets/sortList";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setFilters,
  setMounted,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
// import { SearchContext } from "../App";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = useState("asc");
  // const { searchValue } = React.useContext(SearchContext);

  const refSearch = useRef(false);

  // const isMounted = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortProperty = useSelector((state) => state.filter.sort.sortProperty);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const isMounted = useSelector((state) => state.filter.isMounted);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fakeArray = [...new Array(6)].map(() => (
    <SkeletonPizzaBlock key={uuidv4()} />
  ));

  const isCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const isSearch = searchValue ? `search=${searchValue}` : "";

  const getPizzas = (isCategory, sortProperty, order, isSearch) => {
    setIsLoading(true);
    axios
      .get(
        `https://6426c3f6556bad2a5b576f0b.mockapi.io/pizzas?${isCategory}&sortBy=${sortProperty}&order=${order}&${isSearch}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  // Проверяем есть ли у нас в url параметры через window.location.search
  // Можно так же использовать хук useSearchParams
  useEffect(() => {
    if (window.location.search) {
      // substring(1) убираем "?" при парсе параметров
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      if (
        window.location.search !== "?sortProperty=rating&categoryId=0&order=asc"
      ) {
        refSearch.current = true;
      }

      // refSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    if (!refSearch.current) {
      getPizzas(isCategory, sortProperty, order, isSearch);
    }

    refSearch.current = false;
  }, [sortProperty, isCategory, order, isSearch]);

  // проверяем был ли первый рендер или нет и надо ли вшивать параметры в адресную строку
  useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        sortProperty,
        categoryId,
        order,
      });
      navigate(`?${queryString}`);
    }
    // isMounted.current = true;
    dispatch(setMounted(true));
  }, [sortProperty, categoryId, order]);

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
