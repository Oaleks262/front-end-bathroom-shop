import React from "react";
import HeaderWhite from '../Header/HeaderWhite';
import { setCartToLocalStorage,getProductFromLocalStorage } from '../Cart/localSave';
import { useState } from 'react';
import lefticon from '../../assets/img/landing/aboutProduct/icon-left.svg'

const ProductDetailsPage = () => {
    const [cart, setCart] = useState([]);
    const product = getProductFromLocalStorage();
    const addToCart = (product) => {
        setCart([...cart, product]);
        setCartToLocalStorage(product);
        setTimeout(() => {
            setCart(prevCart => prevCart.filter(item => item !== product));
        }, 10000);
    };



    return (
        <div className="detailes-product">
            <div className='content-padding'>
                <HeaderWhite/>
            <div className="detailes-product-back">
                <a className="detailes-product-btn-back" href="/product"><img src={lefticon}/>Повернутись до товарів</a>
            </div>
            <div className="conteiner-product">
            <div className="conteiner-product-img">
            <img src={product.avatarUrl} alt={product.titleProduct} />
            </div>
            <div className="conteiner-product-text">
            <h2>{product.titleProduct}</h2>
            <p>{product.category}</p>
            <p>{product.aboutProduct}</p>
            <p>Ціна: {product.priceProduct} грн</p>
            <button onClick={() => addToCart(product)} className={`minimarket-shop-li-button ${cart.includes(product) ? 'added' : ''}`}>
                      {cart.includes(product) ? 'Додано' : 'Придбати'}
            </button>
            </div>
            </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
