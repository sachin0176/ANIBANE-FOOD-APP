import { useState } from 'react';
import CartProvider from './store/CartProvider';
import './App.css';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {

  const [showIsCart, setShowIsCart]=useState(false);
  const showCartHandler= (event) =>{
    event.preventDefault();
    setShowIsCart(true)
  }
  const hideCartHandler =(event) =>{
    event.preventDefault();
    setShowIsCart(false);
  }
  return (
  <CartProvider>
    {showIsCart && <Cart onClose={hideCartHandler}/>}
  <Header onShowCart={showCartHandler}/>
  <main>
    <Meals />
  </main>

  
  </CartProvider>
  );
}

export default App;
