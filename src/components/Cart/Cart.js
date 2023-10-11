import React, { Fragment, useContext, useState } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout/Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const [isChekout, setIsChekout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const {sendRequest: postRequest , error, isLoading}=useHttp();

  const hashItem = cartCxt.items.length > 0;

  const removeToCartHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const orderHandler = (event) => {
    event.preventDefault();

    setIsChekout(true);
  };

  const addToCartHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };


  const orderConfirmHandler =(userData)=>{
    setDidSubmit(false);
    const total=+cartCxt.totalAmount.toFixed(2);
    const fetchData=(data)=>{
      console.log(data);
    }
    postRequest({url: "https://react-http-e231c-default-rtdb.firebaseio.com/orders.json",
  method: 'POST',
body:{
  user: userData,
  orderItems: cartCxt.items,
  totalAmount: total
},
headers: {
  'Content-Type': 'application/json'
}}, fetchData);

if(error) 
return;

setDidSubmit(true);
cartCxt.clearCart();


  }
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

 
  const isSumbmittingModalContent=<p>Sending order data...</p>
  const didSubmitModalContent=<Fragment >
    <p>Successfully sent the order!</p>
    <div className={styles.actions}>
          <button onClick={props.onClose} className={styles["button"]}>
            Close
          </button>
          </div>

  </Fragment>

  const cartModalContent=<Fragment>
  {cartItems}
      <div className={styles.total}>
        <span>Total Price</span>
        <span>₹{+cartCxt.totalAmount.toFixed(2)}</span>
      </div>
      {isChekout && (
        <Checkout onConfirm={orderConfirmHandler} onClose={props.onClose} />
      )}
      {!isChekout && (
        <div className={styles.actions}>
          <button onClick={props.onClose} className={styles["button--alt"]}>
            Close
          </button>
          {hashItem && (
            <button className={styles["button"]} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}</Fragment>;

  



  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSumbmittingModalContent}
      {!isLoading && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
