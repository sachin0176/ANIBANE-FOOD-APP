import React, { useContext } from "react";
import styles from './MealItem.module.css';
import MealItemForm from "../MealItemForm/MealItemForm";
import CartContext from "../../../store/cart-context";



const MealItem =(props)=>{
    const price=`₹${+props.price.toFixed(2)}`;
    const cartCxt=useContext(CartContext);
    const addToCartHandler =(amount) =>{

        cartCxt.addItem({
            id: props.id,
            name:props.name,
            price: props.price,
            amount: amount

        });

    }


    return <li className={styles.meal}>
        <div>
            <h3 className={styles.name}>{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} id={props.id}/>
        </div>
    </li>


};

export default MealItem;

