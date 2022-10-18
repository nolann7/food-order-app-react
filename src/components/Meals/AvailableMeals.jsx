import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './Meal/MealItem';

const AvailableMeals = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          'https://react-http-5f8c9-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
        );
        if (!response.ok) throw new Error('something went wrong');
        const data = await response.json();
        setIsLoaded(true);
        setMeals(data);
      } catch (err) {
        setIsLoaded(true);
        setError(err);
        console.error(err.message);
      }
    };
    fetchMeals()
    // .catch(err => {
    //   setIsLoaded(true);
    //   setError(err);
    // })
    // вместо try catch внутри fetchMeals мы можем просто использовать catch на вызов fetchMeals, так как синхронно возвращается промис
  }, []);

  const MealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {!isLoaded && <p className={classes.loading}>Loading...</p>}
        {error && <div className={classes['error-fetch']}>Ошибка: {error.message}</div>}
        {isLoaded && <ul>{MealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
