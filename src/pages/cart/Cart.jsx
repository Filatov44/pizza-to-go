import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/cartItem/CartItem";
import styles from "./Cart.module.scss";
import { clearItems, removeItems } from "../../redux/slices/cartSlice";

import { selectCart, selectCartItem } from "../../redux/selectors";
import CartEmpty from "../../components/cartEmpty/CartEmpty";
import CartTop from "../../components/cartTop/CartTop";
import CartBottom from "../../components/cartBottom/CartBottom";
import CustomModal from "../../components/modal/CustomModal";

export default function Cart() {
 const [open, setOpen] = useState(false);
  const [delItm, setDelItm] = useState("");
  console.log(delItm);


  const setDelete = (uId) => {
    setDelItm(uId)
    setOpen(true)
  }
  

  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);
  const deleteItem = useSelector(selectCartItem).find(
        (obj) => obj.uId === delItm)
  
  console.log(deleteItem);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const clearCart = () => {
    if (window.confirm("Ви дійсно бажаєте очистити корзину ?")) {
      dispatch(clearItems());
    }
  };

   const removePizza = () => {
     // if (window.confirm("Ви дійсно бажаєте видалити ?")) {
     setOpen(false);
     dispatch(
       removeItems(
         deleteItem
       )
     );
     console.log(2);
       
     // }
   };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.cart}>
      <CartTop clearCart={clearCart} />
      <div className="content__items-cart">
        {items.map(
          (item) =>
            item.count > 0 && (
              <CartItem
                key={item.uId}
                {...item}
                onChange={setDelete}
                
              />
            )
        )}
      </div>
      <CartBottom totalCount={totalCount} totalPrice={totalPrice} />
      {open && (
        <CustomModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          onDelete={removePizza}
          submitBtn="Так"
          cancelBtn="Hi"
        >
          <>
            <div>Ви дійсно бажаєте видалити цю позицію?</div>
            <img
              className="pizza-block__image"
              src={deleteItem.imageUrl}
              alt="Pizza"
            />
            <h3>{deleteItem.title}</h3>
            <p>
              {deleteItem.type}, {deleteItem.size} см.
            </p>
          </>
        </CustomModal>
      )}
    </div>
  );
}
