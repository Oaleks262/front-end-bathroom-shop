import React from "react";
import './ProductDetalPage.css'
import HeaderWhite from '../Header/HeaderWhite';
import { setCartToLocalStorage,getProductFromLocalStorage } from '../Cart/localSave';
import { useState } from 'react';
import lefticon from '../../assets/img/landing/aboutProduct/icon-left.svg'
import Footer from '../../components/Footer/Footer'

const ProductDetailsPage = () => {
    const [prod, setProd] = useState([]);

    const product = getProductFromLocalStorage();

    console.log(product);

    const addToCart = (product) => {
        setProd([...prod, product]);
        setCartToLocalStorage(product);
        setTimeout(() => {
            setProd(prevCart => prevCart.filter(item => item !== product));
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
                        <h2 className="conteiner-product-text-h2">{product.titleProduct}</h2>
                        <p className="conteiner-product-text-category">{product.category}</p>
                        <p className="conteiner-product-text-about">{product.aboutProduct}</p>
                        <p className="conteiner-product-text-price">{product.priceProduct} грн</p>
                        <button onClick={() => addToCart(product)} className={`conteiner-product-li-button ${prod.includes(product) ? 'added' : ''}`}>
                                {prod.includes(product) ? 'Додано' : 'Придбати'}
                        </button>
                    </div>
                </div>
                <Footer/>
            </div>

        </div>
    );
};

export default ProductDetailsPage;
