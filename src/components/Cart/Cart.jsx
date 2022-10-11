import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';

import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
  const ctxCart = useContext(CartContext);
  const totalAmount = `$${ctxCart.totalAmount.toFixed(2)}`;
  const hasItems = ctxCart.items.length > 0;

  const cartItemAddHandler = item => {
    ctxCart.addItem(item);
  };
  const cartItemRemoveHandler = id => {
    ctxCart.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {ctxCart.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
