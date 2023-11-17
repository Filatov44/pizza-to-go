import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/cartItem/CartItem";
import CartEmpty from "../../components/cartEmpty/CartEmpty";
import CartTop from "../../components/cartTop/CartTop";
import CartBottom from "../../components/cartBottom/CartBottom";
import CustomModal from "../../components/modal/CustomModal";
import DeleteModalItems from "../../components/deleteModalItem/DeleteModalItems";
import CartClear from "../../components/cartClear/CartClear";
import styles from "./Cart.module.scss";
import { clearItems, removeItems } from "../../redux/slices/cartSlice";

import { selectCart, selectCartItem } from "../../redux/selectors";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [openClearCard, setOpenClearCard] = useState(false);
  const [delItm, setDelItm] = useState("");

  const setDelete = (uId) => {
    setDelItm(uId);
    setOpen(true);
  };

  const setDeleteCart = () => {
    setOpenClearCard(true);
  };

  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);
  const deleteItem = useSelector(selectCartItem).find(
    (obj) => obj.uId === delItm
  );

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const clearCart = () => {
    dispatch(clearItems());
  };

  const removePizza = () => {
    setOpen(false);
    dispatch(removeItems(deleteItem));
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.cart}>
      <CartTop clearCart={setDeleteCart} />
      <div className={styles.card__content}>
        {items.map(
          (item) =>
            item.count > 0 && (
              <CartItem key={item.uId} {...item} onChange={setDelete} />
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
          cancelBtn="Ні"
        >
          <DeleteModalItems {...deleteItem} />
        </CustomModal>
      )}
      {openClearCard && (
        <CustomModal
          isOpen={openClearCard}
          onClose={() => setOpenClearCard(false)}
          onCancel={() => setOpenClearCard(false)}
          onDelete={clearCart}
          submitBtn="Так"
          cancelBtn="Ні"
        >
          <CartClear />
        </CustomModal>
      )}
    </div>
  );
}
