import React, { useState, useEffect } from 'react';
import './CustomerList.css';
import search from '../../../assets/img/icon/search-1.svg';
import delet from '../../../assets/img/admin/delete.svg';
import edit from '../../../assets/img/admin/edit.svg';
import DeletePopup from '../Popup/DeletePopup';
import { AdminApi } from '../../../assets/api/api';
import EditOrderPopup from '../Popup/EditOrderPopup';

const CustomerList = () => {
  const [originalPeopleData, setOriginalPeopleData] = useState([]); // Оригінальні дані
  const [peopleData, setPeopleData] = useState([]); // Стейт для зберігання даних про клієнтів
  const [currentPage, setCurrentPage] = useState(1); // Стейт для поточної сторінки
  const [searchText, setSearchText] = useState(''); // Стейт для зберігання тексту пошуку
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Стан для відстеження відкриття/закриття попапу
  const [customersToDelete, setCustomersToDelete] = useState(null); // Ідентифікатор відгуку для видалення
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  

  const itemsPerPage = 8; // Кількість елементів на сторінці

  useEffect(() => {
    // Отримання замовлень та встановлення їх у стан компонента
    AdminApi.getAdminOrders()
      .then(response => {
        console.log(response)
        const peopleData = Array.isArray(response.data.orders) ? response.data.orders : [];
        const formattedOrders = peopleData.map(order => ({
          id: order._id,
          firstName: order.firstName,
          lastName: order.lastName,
          phone: order.phoneNumber,
          city: order.city,
          postOffice: order.postOffice,
          numberPost: order.numberPost,
          productItems: order.productItems.map(productItem => ({
            title: productItem.title,
            quantity: productItem.quantity,
            price: productItem.price,
            total: productItem.total
          })),
          position: order.position,
          ttn: order.ttn,
          totalAmount: order.totalAmount,
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
  const openDeletePopup = orderId => {
    setCustomersToDelete(orderId);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setCustomersToDelete(null);
    setShowDeletePopup(false);
  };
  const handleDeleteCustomers = async () => {
    try {
      console.log('Deleting product:', customersToDelete);
      await AdminApi.deleteAdminOrder(customersToDelete);
      const updatedCustomersList = peopleData.filter(order => order.id !== customersToDelete);
      console.log('Updated list:', updatedCustomersList);
      setPeopleData(updatedCustomersList);
      closeDeletePopup();
    } catch (error) {
      console.error('Error deleting product:', error.response);
    }
  };
  const getStatusEmoji = (position) => {
    switch (position) {
      case 'new':
        return '🟡 Нове';
      case 'processing':
        return '🟠 В обробці';
      case 'rejection':
        return '🔴 Відхилено';
      case 'done':
        return '🟢 Виконано';
        
        default:
        return position;
 // якщо статус не відомий, повертаємо його без змін
    }
  };
  

  const openEditPopup = (orderId) => {
    setOrderToEdit(orderId);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setOrderToEdit(null);
    setIsEditPopupOpen(false);
  };

  const handleSaveChanges = async (updatedOrder) => {
    try {
      // Викликати функцію для збереження змін
      const response = await AdminApi.putAdminOrder(updatedOrder.id, updatedOrder);
      console.log('Order updated successfully:', updatedOrder);
      // Оновити стан даних в компоненті
      setPeopleData(prevData => {
        const updatedData = [...prevData];
        const index = updatedData.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
          updatedData[index] = { ...updatedData[index], ...updatedOrder };
        }
        return updatedData;
      });
      // Закрити вікно редагування після успішного збереження
      closeEditPopup();
    } catch (error) {
      console.error('Error updating order:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
        console.error('Status Code:', error.response.status);
      }
    }
    }
  

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
            <p className='list-total'>Сума</p>
            <p className="list-status">Статус</p>
            <p className='list-edit'>Редагувати</p>
            <p className='list-delete'>Видалити</p>
          </div>
          <ul id="people-list">
  {displayPage().map(order => (
    <li key={order.id} className="list-li-customer">
      <p className="list-name">{order.firstName} {order.lastName}</p>
      <p className="list-number">{order.phone}</p>
      <p className="list-city">{order.city}</p>
      <p className="list-post">{order.postOffice}</p>
      <p className="list-post-num">{order.numberPost}</p>
      <p className="list-shop">
  {order.productItems.map((productItem, index) => (
    <span key={index}>
      {productItem.title}: {productItem.quantity}шт. {productItem.total} грн.
      {index < order.productItems.length - 1 && ', '}
    </span>
  ))}
</p>
      <p className='list-total'>{order.totalAmount}</p>
      <p className="list-status">{getStatusEmoji(order.position)}</p>
      <p className='list-edit'>
                  <a onClick={() => openEditPopup(order)}>
                    <img src={edit} alt="edit" />
                  </a>
                </p>
      <p className='list-delete'><a onClick={() => {
    openDeletePopup(order.id)}} ><img src={delet}/></a></p>
    </li>
  ))}
</ul>
{showDeletePopup && (<DeletePopup onCancel={closeDeletePopup} onConfirm={handleDeleteCustomers} />)}

{isEditPopupOpen && (
            <EditOrderPopup order={orderToEdit} onSave={handleSaveChanges} onClose={closeEditPopup} />
          )}
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
