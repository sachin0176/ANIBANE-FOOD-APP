import React, { Fragment, useEffect,useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import useHttp from "../../../hooks/use-http";


const AvailableMeals = () => {

 const [meals, setMeals]=useState([]);
  const {sendRequest,error, isLoading} =useHttp()
  

 
  
  useEffect(()=>{

    const fetchData =(data)=>{
     const loadedData=[];
      for(const key in data){
       loadedData.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price
       })
      }

      setMeals(loadedData);
      
    }
  

    sendRequest({url: "https://react-http-e231c-default-rtdb.firebaseio.com/meals.json"},fetchData)
    
  },[sendRequest]);
  
  
  let mealsList;
  if(isLoading){
    mealsList=<p>Loadding...</p>
  }

  if (!isLoading && error) {
    mealsList = <p>Error loading data: {error}</p>;
  }

  if (Array.isArray(meals) && meals.length > 0) {
    mealsList = meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }
  return (
    <section className={styles.meals}>
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;
