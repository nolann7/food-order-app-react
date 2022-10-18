import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import CheckOutForm from './CheckOut/CheckOutForm';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const ctxCart = useContext(CartContext);
  const totalAmount = `$${ctxCart.totalAmount.toFixed(2)}`;
  const hasItems = ctxCart.items.length > 0;

  const cartItemAddHandler = item => {
    ctxCart.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = id => {
    ctxCart.removeItem(id);
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
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

  const actions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <CheckOutForm onCancel={props.onClose}/>}
      {!isCheckout && actions}
    </Modal>
  );
};

export default Cart;
