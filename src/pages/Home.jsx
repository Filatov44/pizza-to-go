import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import SkeletonPizzaBlock from "../components/skeleton/SkeletonPizzaBlock.jsx";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

export default function Home() {

     const [pizzas, setPizzas] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     const fakeArray = [...new Array(6)].map(() => (
       <SkeletonPizzaBlock key={uuidv4()} />
     ));

     useEffect(() => {
       fetch("https://6426c3f6556bad2a5b576f0b.mockapi.io/pizzas")
         .then((res) => {
           return res.json();
         })
         .then((items) => {
           setPizzas(items);
           setIsLoading(false);
         });
     }, []);


    return (
      <>
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? fakeArray
            : pizzas.map((pizza) => {
                return <PizzaBlock key={uuidv4()} {...pizza} />;
              })}
        </div>
      </>
    );
}
