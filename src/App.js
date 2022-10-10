import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsOpen] = useState(false);
  const cartShowHandler = props => {
    setCartIsOpen(true);
  };
  const cartCloseHandler = props => {
    setCartIsOpen(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={cartCloseHandler} />}
      <Header onShow={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
