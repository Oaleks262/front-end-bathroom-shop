import React, { useState } from "react";
import './ProductDetalPage.css';
import HeaderWhite from '../Header/HeaderWhite';
import { setCartToLocalStorage, getProductFromLocalStorage } from '../Cart/localSave';
import lefticon from '../../assets/img/landing/aboutProduct/icon-left.svg';
import Footer from '../../components/Footer/Footer';
import HeaderMobile from "../Header/HeaderMobile";
import addbutton from "../../assets/img/landing/shopping/addshop.svg"
import removbutton from "../../assets/img/landing/shopping/removeshop.svg"

const ProductDetailsPage = () => {
    const [quantity, setQuantity] = useState(1); // Створюємо стан для кількості
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const product = getProductFromLocalStorage();

    const addToCart = (product) => {
        const productWithQuantity = { ...product, quantity }; // Додаємо кількість до товару
        setCartToLocalStorage(productWithQuantity); // Передаємо товар разом із кількістю
        setIsAddedToCart(true);
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 10000);
    };

    // Функції для збільшення і зменшення кількості товару
    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className="detailes-product">
            <div className='content-padding'>
                <HeaderWhite />
                <HeaderMobile />
                <div className="detailes-product-back">
                    <a className="detailes-product-btn-back" href="/product"><img src={lefticon} alt="Назад"/>Повернутись до товарів</a>
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
                        
                        {/* Блок з кнопками "+" і "-" для зміни кількості */}
                        <div className="quantity-controls">
                            <p className="quantity-btn-detal" onClick={decrementQuantity}><img src={removbutton}/></p>
                            <span className="quantity-value-detal">{quantity}</span>
                            <p className="quantity-btn-detal" onClick={incrementQuantity}><img src={addbutton}/></p>
                        </div>

                        <button 
                            onClick={() => addToCart(product)} 
                            className={`conteiner-product-li-button ${isAddedToCart ? 'added' : ''}`}
                        >
                            {isAddedToCart ? 'Додано' : 'Придбати'}
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
