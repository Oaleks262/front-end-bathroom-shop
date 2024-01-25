import React, { useState, useEffect } from 'react';
import './FeedbackList.css';
import search from '../../../assets/img/icon/search-1.svg';
import delet from '../../../assets/img/admin/delete.svg'
import DeletePopup from '../Popup/DeletePopup';
import { AdminApi } from '../../../assets/api/api';

const FeedbackList = () => {
  const [originalFeedbackData, setOriginalFeedbackData] = useState([]); // Оригінальні дані
  const [feedbackData, setFeedbackData] = useState([]); // Стейт для зберігання даних про клієнтів
  const [currentPage, setCurrentPage] = useState(1); // Стейт для поточної сторінки
  const [searchText, setSearchText] = useState(''); // Стейт для зберігання тексту пошуку
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Стан для відстеження відкриття/закриття попапу
  const [feedbackToDelete, setFeedbackToDelete] = useState(null); // Ідентифікатор відгуку для видалення

  const itemsPerPage = 8; // Кількість елементів на сторінці

  useEffect(() => {
    // Отримання замовлень та встановлення їх у стан компонента
    AdminApi.getAdminFeedback()
      .then(response => {
        console.log(response)
        const feedbackData = Array.isArray(response.data.feedbackList) ? response.data.feedbackList: [];
        const formattedFeedbacks = feedbackData.map(feedback => ({
          id: feedback._id,
          date: feedback.date,
          fullName: feedback.fullName,
          feedback: feedback.feedback 
     
        
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
            feedback =>
              feedback.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
              feedback.feedback.toLowerCase().includes(searchText.toLowerCase())
          );
      // Встановлюємо відфільтровані дані
      setFeedbackData(filteredData);
      setCurrentPage(1); // Скидаємо сторінку до першої при зміні результатів пошуку
    }
  };

  const openDeletePopup = feedbackId => {
    setFeedbackToDelete(feedbackId);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setFeedbackToDelete(null);
    setShowDeletePopup(false);
  };

  const handleDeleteFeedback = async () => {
    try {
     
      await AdminApi.deleteAdminFeedback(feedbackToDelete);
      
    
      const updatedFeedbackList = feedbackData.filter(feedback => feedback.id !== feedbackToDelete);
      setFeedbackData(updatedFeedbackList);

     
      closeDeletePopup();
    } catch (error) {
      console.error('Помилка при видаленні відгуку:', error);
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
            <p className="list-date">Дата</p>
            <p className="list-name">ПІБ</p>
            <p className="list-feedback">Відгук</p>
            <p className='list-delete'>Видалити</p>
          </div>
          <ul id="people-list">
                {displayPage().map(feedback => (
                  <li key={feedback.id} className="list-li">
                    <p className="list-date">{feedback.date}</p>
                    <p className="list-name">{feedback.fullName}</p>
                    <p className="list-feedback">{feedback.feedback}</p>
                    <p className='list-delete'>
                    <a onClick={() => {
    openDeletePopup(feedback.id);
  }}>
                    <img src={delet} alt="delete" />
                  </a>
                </p>

                  </li>
                ))}

          </ul>
          {showDeletePopup && (
          <DeletePopup onCancel={closeDeletePopup} onConfirm={handleDeleteFeedback} />
        )}


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

export default FeedbackList;