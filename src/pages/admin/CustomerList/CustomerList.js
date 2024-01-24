import React, { useState, useEffect } from 'react';
import './CustomerList.css';
import search from '../../../assets/img/icon/search-1.svg';
import { AdminApi } from '../../../assets/api/api';

const CustomerList = () => {
  const [originalPeopleData, setOriginalPeopleData] = useState([]); // Оригінальні дані
  const [peopleData, setPeopleData] = useState([]); // Стейт для зберігання даних про клієнтів
  const [currentPage, setCurrentPage] = useState(1); // Стейт для поточної сторінки
  const [searchText, setSearchText] = useState(''); // Стейт для зберігання тексту пошуку
  const [orders, setOrders] = useState([]);

  const itemsPerPage = 8; // Кількість елементів на сторінці

  useEffect(() => {
    // Отримання замовлень та встановлення їх у стан компонента
    AdminApi.getAdminOrders()
      .then(response => {
        const ordersData = Array.isArray(response.data.orders) ? response.data.orders : [];
        const formattedOrders = ordersData.map(order => ({
          id: order._id,
          name: `${order.firstName} ${order.lastName}`,
          number: order.phoneNumber,
          city: order.city,
          email: order.postOffice,
          numberPost: order.numberPost,
          productItems: order.productItems.map(item => `${item.title}:${item.quantity}шт.  `),
          status: order.acrivePosition,
        }));
        setOriginalPeopleData(formattedOrders);
        setPeopleData(formattedOrders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const displayPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = peopleData.slice(startIndex, endIndex);

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
      setPeopleData(originalPeopleData);
    } else {
      const filteredData = originalPeopleData.filter(
        person =>
          person.name.toLowerCase().includes(searchText.toLowerCase()) ||
          person.number.includes(searchText) ||
          person.email.toLowerCase().includes(searchText.toLowerCase())
      );
      // Встановлюємо відфільтровані дані
      setPeopleData(filteredData);
      setCurrentPage(1); // Скидаємо сторінку до першої при зміні результатів пошуку
    }
  };

  return (
    <>
      <div className="title">
        <h1>Привіт Тетяно 👋🏼,</h1>
      </div>
      <div className="customers">
        <div className="customers-header">
          <div className="customers-header-title">
            <h2>Усі замовлення</h2>
            <p>Список замовлень</p>
          </div>
          <div className="customers-header-search">
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
        <div className="customers-list">
          <div className="customers-list-title">
            <p className="list-name">ФІО</p>
            <p className="list-number">Номер телефону</p>
            <p className="list-city">Місто</p>
            <p className="list-post">Пошта</p>
            <p className="list-post-num">Відділення</p>
            <p className="list-shop">Замовлення</p>
            <p className="list-status">Статус</p>
          </div>
          <ul id="people-list">
  {displayPage().map(order => (
    <li key={order.id} className="list-li">
      <p className="list-name">{order.name}</p>
      <p className="list-number">{order.number}</p>
      <p className="list-city">{order.city}</p>
      <p className="list-post">{order.email}</p>
      <p className="list-post-num">{order.numberPost}</p>
      <p className="list-shop">{order.productItems}</p>
      <p className="list-status">{order.status}</p>
    </li>
  ))}
</ul>


          <div id="searchResult"></div>
        </div>
        <div className="customers-pages">
          <p>
            Showing data {currentPage} to {Math.min(currentPage * itemsPerPage, peopleData.length)} of {peopleData.length}
          </p>
          <ul className="customers-pages-list">
            <li className="customers-pages-li-back">
              <a href="#" onClick={() => handlePageClick(currentPage - 1)}>
                {'<'}
              </a>
            </li>
            {Array.from({ length: Math.ceil(peopleData.length / itemsPerPage) }).map((_, index) => (
              <li key={index + 1} className={`customers-pages-li ${currentPage === index + 1 ? 'customers-pages-li-on' : ''}`}>
                <a href="#" onClick={() => handlePageClick(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="customers-pages-li-next">
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

export default CustomerList;
