import React, { useContext } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const hashItem = cartCxt.items.length > 0;

  const removeToCartHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const addToCartHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {" "}
      {cartCxt.items.map((meal) => (
        <CartItem
          id={meal.id}
          key={meal.id}
          name={meal.name}
          price={meal.price}
          amount={meal.amount}
          onRemove={removeToCartHandler.bind(null, meal.id)}
          onAdd={addToCartHandler.bind(null, meal)}
        ></CartItem>
      ))}{" "}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Price</span>
        <span>₹{+cartCxt.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onClose} className={styles["button--alt"]}>
          Close
        </button>
        {hashItem && <button className={styles["button"]}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
