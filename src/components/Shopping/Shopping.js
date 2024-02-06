import React, { useState, useEffect } from 'react';
import './Shopping.css';
import HeaderWhite from '../Header/HeaderWhite';
import iconDelet from '../../assets/img/landing/shopping/deleteShop.svg';

import { getCartFromLocalStorage } from '../Cart/localSave';

const Shopping = () => {
  const [cart, setCart] = useState([]);
  const [counters, setCounters] = useState({});

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    setCart(storedCart);
    // Ініціалізуємо лічильники для існуючих продуктів у кошику
    const initialCounters = {};
    storedCart.forEach(item => {
      initialCounters[item._id] = 0; // або можна встановити значення збереженої кількості з об'єкта
    });
    setCounters(initialCounters);
    
  }, []);

  const totalSum = cart.reduce((sum, item) => {
    const price = parseFloat(item.priceProduct);
    const quantity = parseInt(item.quantity);
  
    if (!isNaN(price) && !isNaN(quantity)) {
      const productSum = price * quantity;
      return isNaN(productSum) ? sum : sum + productSum;
    }
  
    return sum;
  }, 0);

  const handleIncrement = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === productId) {
          return {
            ...item,
            quantity: (item.quantity || 0) + 1
          };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  const handleDecrement = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === productId && item.quantity > 0) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getCartItemData = (item) => {
    return {
      title: item.titleProduct,
      item: item.itemProduct,
      quantity: item.quantity,
      price: item.priceProduct
    };
  };

  
  
  return (
    <div className='shopping'>
      <div className='content-padding'>
        <HeaderWhite />
        <div className='shopping-content'>
          <div className='shopping-product'>
            <h2>Товар у корзині:</h2>
            
            <ul className='shopping-product-ul'>
              {cart.map((item, index) => (
                
                <li key={index} className='shopping-product-li'>
                  <img src={item.avatarUrl} alt={item.titleProduct} className='shopping-product-img'/>
                  <p className='shopping-product-title'>{item.titleProduct}</p>
                  <div className='shopping-product-button'>
                  <button className='shopping-product-button-btn' onClick={() => handleDecrement(item._id)}>-</button>
                  <input className='shopping-product-button-inp' type="text" name='quantity' value={item.quantity} readOnly />
                  <button className='shopping-product-button-btn' onClick={() => handleIncrement(item._id)}>+</button> 
                  </div>
                  <p className='shopping-product-price'>{item.priceProduct} грн</p>
                  <p className='shopping-product-tot'>{item.priceProduct * item.quantity} грн.</p>
                  <a className='shopping-product-del' onClick={() => handleRemoveItem(item._id)}><img src={iconDelet} alt='delete'/></a>
                </li>
              ))}
            </ul>
            <p className='shopping-product-total'>Загальна сума усіх товарів: <b>{totalSum} грн</b></p>
          </div>

          <div className='shopping-form'>
            <h2>Вкажіть дані для відправки</h2>
            <form className='shopping-form-form' action="/submit_shop" method="POST">
              <label htmlFor="firstName">Ім'я:</label>
              <input className='shopping-form-input' type="text" id="firstName" name="firstName" placeholder="Вкажіть своє ім'я" required/>

              <label htmlFor="lastName">Прізвище:</label>
              <input className='shopping-form-input' type="text" id="lastName" name="lastName" placeholder="Вкажіть своє прізвище" required/>

              <label htmlFor="phoneNumber">Номер телефону:</label>
              <input className='shopping-form-input' type="tel" id="phoneNumber" name="phoneNumber" placeholder="+380ХХХХХХХХХ" required/>

              <label htmlFor="city">Місто:</label>
              <input className='shopping-form-input' type="text" id="city" name="city" placeholder="Вкажіть населений пункт" required/>

              <label htmlFor="postOffice">Пошта:</label>
              <select className='shopping-form-input' id="postOffice" name="postOffice" required>
                <option value="" disabled defaultValue>Оберіть пошту</option>
                <option value="novaPoshta">Нова пошта</option>
                <option value="ukrPoshta">Укр пошта</option>
              </select>

              <label htmlFor="numberPost">Номер відділення:</label>
              <input className='shopping-form-input' type="text" id="numberPost" name="numberPost" placeholder="Вкажіть номер відділення"required/>

              <button className='shopping-form-button' type="submit"></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
