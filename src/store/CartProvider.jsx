import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultState = {
  items: [],
  totalAmount: 0,
};
function cartReducer(state, action) {
  if (action.type === 'ADD') {
    let updatedItems;

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartIndex = state.items.findIndex(
      item => item.id === action.item.id,
    );
    const existingCartItem = state.items[existingCartIndex];

    if (existingCartItem) {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'REMOVE') {
    let updatedItems;

    const existingCartIndex = state.items.findIndex(
      item => item.id === action.id,
    );
    const existingCartItem = state.items[existingCartIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === 'CLEAR') {

    return defaultState;
  }
  return defaultState;
}

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemHandler = item => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
