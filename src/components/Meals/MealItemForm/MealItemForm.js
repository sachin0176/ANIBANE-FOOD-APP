import React, { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";

const MealItemForm = (props) => {

    const amountInputRef=useRef();
    const [amountIsValid, setAmountIsValid]=useState(true);

    const submitHandler =(event) =>{
        event.preventDefault();
        
        const enteredAmount=amountInputRef.current.value;

        const enteredAmountNum=+enteredAmount;

        if(enteredAmount.trim().length===0 || enteredAmountNum <0 || enteredAmountNum>5)
        {
            setAmountIsValid(false);
            return ;
        }

        props.onAddToCart(enteredAmountNum);
    }
  return (
    <form className={styles["form"]} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          id: props.id,
        }}
      />

      <button className={styles.action}>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
