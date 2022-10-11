import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const ctxCart = useContext(CartContext);
  console.log(ctxCart.items);
  const numberOfCartItems = ctxCart.items.reduce((currNumer, item) => {
    console.log(`currNumber`, currNumer);
    console.log(`item.amount`, item.amount);
    return currNumer + item.amount;
  }, 0);
  console.log(numberOfCartItems);

  return (
    <button className={classes.button} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
