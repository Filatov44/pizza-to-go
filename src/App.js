import Header from "./components/Header.jsx";
import Categories from "./components/Categories.jsx";
import Sort from "./components/Sort.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";
import pizzas from "./assets/pizza.json";
import { v4 as uuidv4 } from "uuid";
import "./scss/app.scss";


function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => {
              return (
                // <PizzaBlock
                //   key={pizza.id}
                //   title={pizza.title}
                //   price={pizza.price}
                //   imageUrl={pizza.imageUrl}
                //   types={pizza.types}
                //   sizes={pizza.sizes}
                // />
                <PizzaBlock key={uuidv4()} {...pizza} />
              );
          })}
           
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
