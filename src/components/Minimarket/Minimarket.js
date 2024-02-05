import React, { useEffect, useState } from 'react';
import './Minimarket.css';
import { lendingData } from '../../assets/api/api';
import { setCartToLocalStorage } from '../Cart/localSave';

const Minimarket = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await lendingData.getProduct();

        // Випадково перемішуємо масив продуктів
        const shuffledProducts = response.data.sort(() => Math.random() - 0.5);

        // Обмежуємо тільки першими чотирма продуктами
        const limitedProducts = shuffledProducts.slice(0, 4);

        setProducts(limitedProducts);
      } catch (error) {
        setError(error.message || 'Помилка завантаження товарів');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartToLocalStorage(product);
  };
  

  return (
    <div className='minimarket'>
      <div className='content-padding'>
        <div className='minimarket-title'>
          <h2>Популярні продукти</h2>
          <p>Відкрийте для себе всі аромати нашого товару разом з нами. Завжди є щось нове, що варто спробувати</p>
        </div>
        <div className='minimarket-shop'>
          {loading ? (
            <p>Завантаження...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul className='minimarket-shop-ul'>
              {products.map(product => (
                <li key={product._id} className='minimarket-shop-li'>
                  <img className='minimarket-shop-li-img' src={product.avatarUrl} alt={product.titleProduct} />
                  <h3 className='minimarket-shop-li-h3'>{product.titleProduct}</h3>
                  <p className='minimarket-shop-li-category'>{product.category}</p>
                  <p className='minimarket-shop-li-price'>{product.priceProduct} грн</p>
                  <a className='minimarket-shop-li-button' onClick={() => { addToCart(product);}} >Придбати</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='minimarket-inshop'>
          <a className='minimarket-inshop-button'>Перейти до товарів</a>
        </div>
      </div>
    </div>
  );
};

export default Minimarket;

