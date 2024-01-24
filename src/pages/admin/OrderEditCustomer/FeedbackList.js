import React, { useState, useEffect } from 'react';
import './FeedbackList.css';
import search from '../../../assets/img/icon/search-1.svg';
import { AdminApi } from '../../../assets/api/api';

const feedbackList = () => {
  const [originalFeedbackData, setOriginalFeedbackData] = useState([]); // Оригінальні дані
  const [feedbackData, setFeedbackData] = useState([]); // Стейт для зберігання даних про клієнтів
  const [currentPage, setCurrentPage] = useState(1); // Стейт для поточної сторінки
  const [searchText, setSearchText] = useState(''); // Стейт для зберігання тексту пошуку


  const itemsPerPage = 8; // Кількість елементів на сторінці

  useEffect(() => {
    // Отримання замовлень та встановлення їх у стан компонента
    AdminApi.getAdminProduct()
      .then(response => {
        console.log(response)
        const feedbackData = Array.isArray(response.data) ? response.data : [];
        const formattedFeedbacks = feedbackData.map(feedback => ({
          id: feedback._id,
          avatarUrl: product.avatarUrl,
          itemProduct: product.itemProduct,
          titleProduct: product.titleProduct,
          category: product.category,
          aboutProduct: product.aboutProduct,
          priceProduct: product.priceProduct,
        
        }));
        setOriginalFeedbackData(formattedFeedbacks);
        setFeedbackData(formattedFeedbacks);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const displayPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = feedbackData.slice(startIndex, endIndex);

    return displayedData;
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      filterList();
    }
  };

  const handlePageClick = newPage => {
    setCurrentPage(newPage);
  };

  const filterList = () => {
    if (searchText.trim() === '') {
      // Якщо поле пошуку порожнє, відображаємо всіх клієнтів
      setFeedbackData(originalFeedbackData);
    } else {
        const filteredData = originalFeedbackData.filter(
            product =>
              product.itemProduct.toLowerCase().includes(searchText.toLowerCase()) ||
              product.titleProduct.toLowerCase().includes(searchText.toLowerCase()) ||
              product.priceProduct.toString().includes(searchText)
          );
      // Встановлюємо відфільтровані дані
      setFeedbackData(filteredData);
      setCurrentPage(1); // Скидаємо сторінку до першої при зміні результатів пошуку
    }
  };

  return (
    <>
      <div className="title">
        <h1>Привіт Тетяно 👋🏼,</h1>
      </div>
      <div className="feedback">
        <div className="feedback-header">
          <div className="feedback-header-title">
            <h2>Усі продукти</h2>
            <p>Активні продукти</p>
          </div>
          <div className="feedback-header-search">
            <img src={search} alt="search" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onBlur={filterList}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="feedback-list">
          <div className="feedback-list-title">
            <p className="list-img">Зображення</p>
            <p className="list-code">Код</p>
            <p className="list-name">Назва</p>
            <p className="list-category">Категорія</p>
            <p className="list-about">Опис</p>
            <p className="list-price">Ціна</p>
          </div>
          <ul id="people-list">
          {displayPage().map(feedback => (
  <li key={feedback.id} className="list-li">
    <p className="list-img"><img src={product.avatarUrl} className='img-product'/></p>
    <p className="list-code">{product.itemProduct}</p>
    <p className="list-name">{product.titleProduct}</p>
    <p className="list-category">{product.category}</p>
    <p className="list-about">{product.aboutProduct}</p>
    <p className="list-price">{product.priceProduct} грн</p>
  </li>
))}

</ul>


          <div id="searchResult"></div>
        </div>
        <div className="feedback-pages">
          <p>
            Showing data {currentPage} to {Math.min(currentPage * itemsPerPage, feedbackData.length)} of {feedbackData.length}
          </p>
          <ul className="feedback-pages-list">
            <li className="feedback-pages-li-back">
              <a href="#" onClick={() => handlePageClick(currentPage - 1)}>
                {'<'}
              </a>
            </li>
            {Array.from({ length: Math.ceil(feedbackData.length / itemsPerPage) }).map((_, index) => (
              <li key={index + 1} className={`feedback-pages-li ${currentPage === index + 1 ? 'feedback-pages-li-on' : ''}`}>
                <a href="#" onClick={() => handlePageClick(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="feedback-pages-li-next">
              <a href="#" onClick={() => handlePageClick(currentPage + 1)}>
                {'>'}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default feedbackList;