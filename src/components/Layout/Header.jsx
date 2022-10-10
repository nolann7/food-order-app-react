import React from 'react';
import imgMeals from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onShow={props.onShow}/>
      </header>
      <div className={classes['main-image']}>
        <img src={imgMeals} alt="Table full of food" />
      </div>
    </>
  );
};
export default Header;
