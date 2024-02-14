import React from "react";
import './ProductDetalPage.css'
import HeaderWhite from '../Header/HeaderWhite';
import { setCartToLocalStorage,getProductFromLocalStorage } from '../Cart/localSave';
import { useState } from 'react';
import lefticon from '../../assets/img/landing/aboutProduct/icon-left.svg'
import Footer from '../../components/Footer/Footer'
import HeaderMobile from "../Header/HeaderMobile";
const ProductDetailsPage = () => {
    const [prod, setProd] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const product = getProductFromLocalStorage();


    const addToCart = (product) => {
        setProd([...prod, product]);
        setCartToLocalStorage(product);
        setIsAddedToCart(true); // Встановлюємо прапорець, що товар додано до кошика
        setTimeout(() => {
            setIsAddedToCart(false); // Знімаємо прапорець через 10 секунд
        }, 10000);
    };



    return (
        <div className="detailes-product">
            <div className='content-padding'>
                <HeaderWhite/>
                <HeaderMobile/>
            <div className="detailes-product-back">
                <a className="detailes-product-btn-back" href="/product"><img src={lefticon}/>Повернутись до товарів</a>
            </div>
                <div className="conteiner-product">
                    <div className="conteiner-product-img">
                        <img src={product.avatarUrl} alt={product.titleProduct} />
                    </div>
                    <div className="conteiner-product-text">
                        <h2 className="conteiner-product-text-h2">{product.titleProduct}</h2>
                        <p className="conteiner-product-text-category">{product.category}</p>
                        <p className="conteiner-product-text-about">{product.aboutProduct}</p>
                        <p className="conteiner-product-text-price">{product.priceProduct} грн</p>
                        <button onClick={() => addToCart(product)} className={`conteiner-product-li-button ${isAddedToCart ? 'added' : ''}`}>
                            {isAddedToCart ? 'Додано' : 'Придбати'}
                        </button>
                    </div>
                </div>
                <Footer/>
            </div>

        </div>
    );
};

export default ProductDetailsPage;
