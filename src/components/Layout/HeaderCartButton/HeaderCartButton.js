import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCxt = useContext(CartContext);

  const numberOfCartItems=cartCxt.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const btnClass = `${styles["cart-button"]}  ${
    btnIsHighlighted ? styles.bump : ""
  }`;
  const {items} = cartCxt;
  useEffect(() => {
    if(items.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button onClick={props.onClick} className={btnClass}>
      <FontAwesomeIcon icon={faShoppingCart} className={styles["cart-icon"]} />
      <span className={styles["cart-label"]}>Your Cart</span>
      <span className={styles["cart-count"]}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
