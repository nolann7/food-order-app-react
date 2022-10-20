import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CheckOutForm from './CheckOut/CheckOutForm';

import classes from './Cart.module.css';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
 
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

  const postOrderHandler = async (userData = {}) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        'https://react-http-5f8c9-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: userData,
            items: ctxCart.items,
            totalAmount,
          }),
        },
      );

      if (!response.ok) throw new Error('something wrong');
      await response.json();
      setIsSubmitting(false);
      setIsOrdered(true);
      ctxCart.clearCart();
    } catch (error) {
      setIsSubmitting(false);
      console.log(error.message);
    }
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
  let contentForm = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckOutForm onPostOrder={postOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && actions}
    </>
  );
  let loadingSubmission = <p>Loading...</p>;
  let successOrder = (
    <>
      <p className={classes.successPost}>
        Your order has been successfully completed, we will call you later!
      </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isOrdered && contentForm}
      {isSubmitting && !isOrdered && loadingSubmission}
      {isOrdered && !isSubmitting && successOrder}
    </Modal>
  );
};

export default Cart;
