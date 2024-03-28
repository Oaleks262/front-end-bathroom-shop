import React, { useState, useEffect } from 'react';
import './Shopping.css';
import HeaderWhite from '../Header/HeaderWhite';
import iconDelet from '../../assets/img/landing/shopping/deleteShop.svg';
import addProd from '../../assets/img/landing/shopping/addshop.svg'
import remoProd from '../../assets/img/landing/shopping/removeshop.svg'
import { lendingData } from '../../assets/api/api';
import { getCartFromLocalStorage, clearCartFromLocalStorage } from '../Cart/localSave';
import Footer from '../Footer/Footer';
import HeaderMobile from '../Header/HeaderMobile';
import FinePopup from '../Popup/FinePopup';

const Shopping = () => {
  const [cart, setCart] = useState([]);
  const [counters, setCounters] = useState({});

  const [isPopup, setIsPopup] = useState(false);

  const toPopup = () => {
      setIsPopup(!isPopup);
  }
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

  const handleSubmitOrder = async () => {



    // Отримати значення з полів форми
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const city = document.getElementById('city').value;
    const postOffice = document.getElementById('postOffice').value;
    const numberPost = document.getElementById('numberPost').value;
  
    // Створити об'єкт з отриманими значеннями з форми
    const orderData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      city: city,
      postOffice: postOffice,
      numberPost: numberPost,
      productItems: cart.map(item => ({
        title: item.titleProduct,
        item: item.itemProduct,
        quantity: item.quantity,
        price: parseFloat(item.priceProduct)
      }))
    };
  

    try {
      await lendingData.postOrder(orderData);
      console.log('Замовлення успішно відправлено на сервер.');
      localStorage.setItem('orderSent', 'true');
    } catch (error) {
      console.error('Помилка при відправці замовлення на сервер:', error);
    }
    clearCartFromLocalStorage('cart');
    
  

  };
  useEffect(() => {
    const orderSent = localStorage.getItem('orderSent');
    if (orderSent === 'true') {
      setIsPopup(!isPopup);
      localStorage.removeItem('orderSent'); // Після відкриття попапу видаліть запис з локального сховища
    }
  }, [isPopup]);
  

  return (
    <div className='shopping'>
      <div className='content-padding'>
        <HeaderWhite />
        <HeaderMobile/>
        <div className='shopping-content'>
          <div className='shopping-product'>
            <h2>Товар у кошику:</h2>
            <ul className='shopping-product-ul'>
              {cart.map((item, index) => (
                <li key={index} className='shopping-product-li'>
                  <img src={item.avatarUrl} alt={item.titleProduct} className='shopping-product-img'/>
                  <p className='shopping-product-title'>{item.titleProduct}</p>
                  <div className='shopping-product-button'>
                    <button className='shopping-product-button-btn' onClick={() => handleDecrement(item._id)}><img src={remoProd} alt='remove-'/></button>
                    <input className='shopping-product-button-inp' type="text" name='quantity' value={item.quantity} readOnly />
                    <button className='shopping-product-button-btn' onClick={() => handleIncrement(item._id)}><img src={addProd} alt='add+'/></button> 
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
              <form className='shopping-form-form' onSubmit={handleSubmitOrder}>
                <label htmlFor="firstName">Ім'я:</label>
                <input className='shopping-form-input' pattern="[A-Za-zА-Яа-яЁёЄєіІїЇҐґ\s\-']+" type="text" id="firstName" name="firstName" title="Будь ласка, введіть своє імʼя" placeholder="Вкажіть своє ім'я" required/>

                <label htmlFor="lastName">Прізвище:</label>
                <input className='shopping-form-input' pattern="[A-Za-zА-Яа-яЁёЄєіІїЇҐґ\s\-']+" type="text" id="lastName" name="lastName" title="Будь ласка, введіть своє прізвищу" placeholder="Вкажіть своє прізвище" required/>

                <label htmlFor="phoneNumber">Номер телефону:</label>
                <input 
                  className='shopping-form-input' 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  placeholder="+380XXXXXXXXX" 
                  pattern="^\+380[0-9]{9}$" 
                  title="Будь ласка, введіть номер телефону у форматі +380XXXXXXXXX" 
                  required 
                />

                <label htmlFor="city">Місто:</label>
                <input className='shopping-form-input' pattern="[A-Za-zА-Яа-яЁёЄєіІїЇҐґ\s\-']+" type="text" id="city" name="city" title="Будь ласка, введіть населений пункт" placeholder="Вкажіть населений пункт" required/>

                <label htmlFor="postOffice">Пошта:</label>
                <select className='shopping-form-input' id="postOffice" name="postOffice" title='Будь ласка, оберіть пошту' required>
                  <option value='' hidden>Оберіть пошту</option>
                  <option value="novaPoshta">Нова пошта</option>
                  <option value="ukrPoshta">Укр пошта</option>
                </select>

                <label htmlFor="numberPost">Номер відділення:</label>
                <input className='shopping-form-input' pattern="[0-9]+" title="Будь ласка, введіть номер відділення" type="text" id="numberPost" name="numberPost" placeholder="Вкажіть номер відділення" required/>

                <div className='termsCheckbox'>
                    <input 
                        type="checkbox" 
                        required 
                        id="termsCheckbox"
                    />
                    <p> Ознайомлений з умовами 
                        <a href='/delivery'> оплати на доставки</a>
                    </p>
                </div>

                <div className='personalDataCheckbox'>
                    <input 
                        type='checkbox' 
                        required 
                        id="personalDataCheckbox"
                    />
                    <p>Я надаю згоду на 
                        <a href='/processing'> обробку персональних даних</a>
                    </p>
                </div>
                {cart.length > 0 && (  <button className='shopping-form-button' type="submit"></button> )}
              </form>
            </div>
        </div>
        <Footer/>
      </div>
      {isPopup && <FinePopup toPopup={toPopup} />}
    </div>
  );
};

export default Shopping;
