import React, { useRef } from "react";

import qs from "qs";
import Categories from "../../components/categories/Categories.jsx";
import Sort from "../../components/Sort.jsx";
import PizzaBlock from "../../components/pizzaBlock/PizzaBlock.jsx";
import NotFoundItem from "../../components/notFound/NotFoundItem.jsx";
import SkeletonPizzaBlock from "../../components/skeleton/SkeletonPizzaBlock.jsx";
import sortList from "../../assets/sortList.js";
import styled from "./Home.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setFilters,
  setMounted,
} from "../../redux/slices/filterSlice.js";
import { useNavigate } from "react-router-dom";
import { fetchPizzasItems } from "../../redux/slices/pizzaSlice.js";
import {
  selectIsMounted,
  selectPizzaItem,
  selectPizzaStatus,
  selectSearchValue,
  selectorCategoryId,
  selectorSortProperty,
} from "../../redux/selectors.js";

export default function Home() {
  const [order, setOrder] = useState("asc");

  const refSearch = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector(selectorCategoryId);
  const sortProperty = useSelector(selectorSortProperty);
  const searchValue = useSelector(selectSearchValue);
  const isMounted = useSelector(selectIsMounted);

  const pizzas = useSelector(selectPizzaItem);
  const status = useSelector(selectPizzaStatus);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fakeArray = [...new Array(6)].map(() => (
    <SkeletonPizzaBlock key={uuidv4()} />
  ));

  const pizzaShow =
    pizzas.length > 0 ? (
      pizzas.map((pizza) => {
        return <PizzaBlock key={uuidv4()} {...pizza} />;
      })
    ) : (
      <NotFoundItem />
    );

  const isCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const isSearch = searchValue ? `search=${searchValue}` : "";

  const getPizzas = async () => {
    dispatch(
      fetchPizzasItems({
        isCategory,
        sortProperty,
        order,
        isSearch,
      })
    );
  };

  // Проверяем есть ли у нас в url параметры через window.location.search
  // Можно так же использовать хук useSearchParams
  useEffect(() => {
    if (window.location.search) {
      // substring(1) убираем "?" при парсе параметров
      const params = qs.parse(window.location.search.substring(1));
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
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

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

    dispatch(setMounted(true));
  }, [sortProperty, categoryId, order]);

  return (
    <>
      <div className={styled.containerHome}>
        <div className={styled.content__top}>
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort order={order} onChangeOrder={(value) => setOrder(value)} />
        </div>
        <h2 className={styled.content__title}>Піци з обраної категорії</h2>
        {status === "error" ? (
          <div>
            <h2>Нажаль виникла помилка.</h2>
          </div>
        ) : (
          <div
            className={
              pizzas.length ? "content__items" : "content__items-notfound"
            }
          >
            {status === "loading" ? fakeArray : pizzaShow}
          </div>
        )}
      </div>
    </>
  );
}
