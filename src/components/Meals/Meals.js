import React, { Fragment } from "react";
import styles from './Meals.module.css';
import MealsSummary from "./MealsSummary/MealsSummary";
import AvailableMeals from "./AvailableMeals/AvailableMeals";

const Meals=()=>{
    return <Fragment>
            <MealsSummary />
            <AvailableMeals />
    </Fragment>
};

export default Meals;
