import React, { useState, useEffect } from "react";
import HeaderWhite from '../Header/HeaderWhite';
import './Market.css';
import { lendingData } from '../../assets/api/api';
import { setCartToLocalStorage } from '../Cart/localSave';
import ProductDetalPopup from "../Popup/ProductDetalPopup";


const Market = () => {
    const [products, setProducts] = useState([]); // Стан для зберігання списку товарів
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // Стан для зберігання обраної категорії
    const [selectedSortOption, setSelectedSortOption] = useState("popularity"); // Значення "popularity" встановлено за замовчуванням
    const [productDetal, setProductsDetal] = useState (false);
    const [selectedProduct, setSelectedProduct] = useState(null);



    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await lendingData.getProduct();
            const allProducts = response.data;
    
            // Сортувати продукти за популярністю
            const sortedProducts = allProducts.sort(() => Math.random() - 0.5);
            setProducts(sortedProducts);
          } catch (error) {
            console.error("Помилка при отриманні товарів:", error);
          }
        };
    
        fetchProducts();
      }, []);
    
      const openProduct = (product) => {
        setSelectedProduct(product);
        setProductsDetal(true);
    }

    const filterProductsByCategory = async (category) => {
        setSelectedCategory(category); // Оновлення обраної категорії
        try {
            const response = await lendingData.getProduct(); // Отримати всі товари
            const allProducts = response.data; // Отримати дані
            let filteredProducts;
            if (category === "Усі товари") {
                // Показати всі товари
                filteredProducts = allProducts.sort(() => Math.random() - 0.5);
            } else {
                // Показати товари, що належать до обраної категорії
                filteredProducts = allProducts.filter(product => product.category === category).sort(() => Math.random() - 0.5);
            }
            // Сортувати товари після фільтрації
            handleSortChange("popularity");
            setProducts(filteredProducts); // Встановити відфільтровані товари
        } catch (error) {
            console.error("Помилка при отриманні товарів:", error);
        }
    };
    
    const SORT_OPTIONS = {
        popularity: () => products.sort(() => Math.random() - 0.5),
        priceAsc: () => products.sort((a, b) => a.priceProduct - b.priceProduct),
        priceDesc: () => products.sort((a, b) => b.priceProduct - a.priceProduct),
      };
      
      const handleSortChange = (value) => {
        setSelectedSortOption(value);
        setProducts(SORT_OPTIONS[value]());
      };
    
    



const addToCart = (product) => {
    setCart([...cart, product]);
    setCartToLocalStorage(product);
  };
    return (
        <div className="market">
            <div className='content-padding'>
                <HeaderWhite/>
                <div className="market-content">
                    <div className="side-bar">                        
                    <div className="sidebar">
                            <label>Фільтрація:</label>
                   
                            <select value={selectedCategory} onChange={(e) => filterProductsByCategory(e.target.value)}>
                                <option value="Усі товари">Усі товари</option>
                                <option value="Шипуча суміш для ванни">Шипуча суміш для ванни</option>
                                <option value="Морська сіль для ванни">Морська сіль для ванни</option>
                                <option value="Праліне">Праліне</option>
                                <option value="Бомбочки для ванни">Бомбочки для ванни</option>
                                <option value="Подарункові бокси">Подарункові бокси</option>
                                <option value="Розпродаж">Розпродаж</option>
                            </select>

                            <label >Сортування:</label>
                            <select value={selectedSortOption} onChange={(e) => handleSortChange(e.target.value)}>
                                <option value="popularity">Популярність</option>
                                <option value="priceAsc">За зростанням ціни</option>
                                <option value="priceDesc">За спаданням ціни</option>
                            </select>
                        </div>
                    </div>
                    <div className="market-product">
                        {/* Вікно відтворення товарів */}
                        <div className="product-display">
                            {/* Відображення списку товарів */}
                            <ul className='minimarket-shop-ul'>
                                {products.map(product => (
                                    <li key={product._id} className='minimarket-shop-li'>
                                       <a onClick={() => openProduct(product)}>
                                        <img className='minimarket-shop-li-img' src={product.avatarUrl} alt={product.titleProduct} />
                                        <h3 title={product.titleProduct} className='minimarket-shop-li-h3'>{product.titleProduct}</h3>
                                        <p className='minimarket-shop-li-category'>{product.category}</p>
                                        <p className='minimarket-shop-li-price'>{product.priceProduct} грн</p>
                                        </a>
                                        <a className='minimarket-shop-li-button' onClick={() => { addToCart(product); }} >Придбати</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {productDetal && <ProductDetalPopup product={selectedProduct} onClose={() => setProductsDetal(false)} />}
        </div>
    );
};

export default Market;
