import React, { useState, useEffect } from "react";
import HeaderWhite from '../Header/HeaderWhite';
import './Market.css';
import { Link } from 'react-router-dom';
import { lendingData } from '../../assets/api/api';
import { setCartToLocalStorage, setProductToLocalStorage } from '../Cart/localSave';
import Footer from "../Footer/Footer";

const Market = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState("popularity");

    const handleSortChange = (value) => {
        setSelectedSortOption(value);
        setProducts(SORT_OPTIONS[value]());
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await lendingData.getProduct();
                const allProducts = response.data;
                const sortedProducts = allProducts.sort(() => Math.random() - 0.5);
                setProducts(sortedProducts);
            } catch (error) {
                console.error("Помилка при отриманні товарів:", error);
            }
        };
        fetchProducts();
    }, []);

    const filterProductsByCategory = async (category) => {
        setSelectedCategory(category);
        try {
            const response = await lendingData.getProduct();
            const allProducts = response.data;
            let filteredProducts;
            if (category === "Усі товари") {
                filteredProducts = allProducts.sort(() => Math.random() - 0.5);
            } else {
                filteredProducts = allProducts.filter(product => product.category === category).sort(() => Math.random() - 0.5);
            }
            handleSortChange("popularity");
            setProducts(filteredProducts);
        } catch (error) {
            console.error("Помилка при отриманні товарів:", error);
        }
    };

    const SORT_OPTIONS = {
        popularity: () => products.sort(() => Math.random() - 0.5),
        priceAsc: () => products.sort((a, b) => a.priceProduct - b.priceProduct),
        priceDesc: () => products.sort((a, b) => b.priceProduct - a.priceProduct),
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
        setCartToLocalStorage(product);
        setTimeout(() => {
            setCart(prevCart => prevCart.filter(item => item !== product));
        }, 10000);
    };


    const pushToProduct = (product) => {
        setProductToLocalStorage(product);
    }

    return (
        <div className="market">
            <div className='content-padding'>
                <HeaderWhite/>
                <div className="market-content">
                    <div className="side-bar">                        
                        <div className="sidebar">
                            <label>Фільтрація:
                                <select value={selectedCategory} onChange={(e) => filterProductsByCategory(e.target.value)}>
                                    <option value="Усі товари">Усі товари</option>
                                    <option value="Шипуча суміш для ванни">Шипуча суміш для ванни</option>
                                    <option value="Морська сіль для ванни">Морська сіль для ванни</option>
                                    <option value="Праліне">Праліне</option>
                                    <option value="Бомбочки для ванни">Бомбочки для ванни</option>
                                    <option value="Подарункові бокси">Подарункові бокси</option>
                                    <option value="Розпродаж">Розпродаж</option>
                                </select>
                            </label>

                            <label >Сортування:
                                <select value={selectedSortOption} onChange={(e) => handleSortChange(e.target.value)}>
                                    <option value="popularity">Популярність</option>
                                    <option value="priceAsc">За зростанням ціни</option>
                                    <option value="priceDesc">За спаданням ціни</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="market-product">
                        <div className="product-display">
                            <ul className='market-shop-ul'>
                                {products.map(product => (
                                    <li key={product._id} className='market-shop-li'>
                                        <Link to={`/product/${product._id}`} onClick={() => pushToProduct(product)} className='product-link'>
                                            <img className='market-shop-li-img' src={product.avatarUrl} alt={product.titleProduct} />
                                            <h3 title={product.titleProduct} className='market-shop-li-h3'>{product.titleProduct}</h3>
                                            <p className='market-shop-li-category'>{product.category}</p>
                                            <p></p>
                                            <p className='market-shop-li-price'>{product.priceProduct} грн</p>
                                        </Link>
                                        <button onClick={() => addToCart(product)} className={`market-shop-li-button ${cart.includes(product) ? 'added' : ''}`}>
                                            {cart.includes(product) ? 'Додано' : 'Придбати'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                
            <Footer/>
            </div>
        </div>
    );
};

export default Market;

