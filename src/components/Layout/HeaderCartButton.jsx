import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
  const ctxCart = useContext(CartContext);
  const numberOfCartItems = ctxCart.items.reduce((currNumer, item) => {
    return currNumer + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    isBtnHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (ctxCart.items.length === 0) return;

    setIsBtnHighlighted(true);
    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctxCart.items]);

  return (
    <button className={btnClasses} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
