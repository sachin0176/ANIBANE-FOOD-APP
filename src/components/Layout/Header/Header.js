import React, { Fragment } from "react";
import styles from "./Header.module.css";
import mealsImage from "../../../assets/meals.jpg";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles["header"]}>
        <h1>ANIBANE MEALS</h1>
        <HeaderCartButton onClick={props.onShowCart} ></HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicius food" />
      </div>
    </Fragment>
  );
};

export default Header;
