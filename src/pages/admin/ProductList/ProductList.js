import React, { useState, useEffect } from 'react';
import './ProductList.css';
import search from '../../../assets/img/icon/search-1.svg';
import delet from '../../../assets/img/admin/delete.svg';
import edit from '../../../assets/img/admin/edit.svg';
import add from '../../../assets/img/admin/add.svg'
import { AdminApi } from '../../../assets/api/api';
import AddProductPopup from '../Popup/AddProductPopup';
import DeletePopup from '../Popup/DeletePopup';
import EditProductPopup from '../Popup/EditProductPopup';

const ProductList = () => {
  const [originalProductData, setOriginalProductData] = useState([]); // Оригінальні дані
  const [productData, setProductData] = useState([]); // Стейт для зберігання даних про клієнтів
  const [currentPage, setCurrentPage] = useState(1); // Стейт для поточної сторінки
  const [searchText, setSearchText] = useState(''); // Стейт для зберігання тексту пошуку
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Стан для відстеження відкриття/закриття попапу
  const [productToDelete, setProductToDelete] = useState(null); // Ідентифікатор відгуку для видалення
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);


  const itemsPerPage = 8; // Кількість елементів на сторінці

  useEffect(() => {
    // Отримання замовлень та встановлення їх у стан компонента
    AdminApi.getAdminProduct()
      .then(response => {
        console.log(response)
        const productData = Array.isArray(response.data) ? response.data : [];
        const formattedProducts = productData.map(product => ({
          id: product._id,
          avatarUrl: product.avatarUrl,
          itemProduct: product.itemProduct,
          titleProduct: product.titleProduct,
          category: product.category,
          aboutProduct: product.aboutProduct,
          priceProduct: product.priceProduct,
        
        }));
        setOriginalProductData(formattedProducts);
        setProductData(formattedProducts);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const displayPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = productData.slice(startIndex, endIndex);

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
      setProductData(originalProductData);
    } else {
        const filteredData = originalProductData.filter(
            product =>
              product.itemProduct.toLowerCase().includes(searchText.toLowerCase()) ||
              product.titleProduct.toLowerCase().includes(searchText.toLowerCase()) ||
              product.priceProduct.toString().includes(searchText)
          );
      // Встановлюємо відфільтровані дані
      setProductData(filteredData);
      setCurrentPage(1); // Скидаємо сторінку до першої при зміні результатів пошуку
    }
  };

  const openAddProductPopup = () => {
    setShowAddProductPopup(true);
  };

  // Функція для закриття попапу
  const closeAddProductPopup = () => {
    setShowAddProductPopup(false);
  };
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await AdminApi.postAdminProduct(newProduct);
      console.log('Product added successfully:', response.data);
      // Оновіть стан або виконайте інші дії за необхідності
    } catch (error) {
      console.error('Error adding product:', error);
      // Обробте помилку від сервера
    }
  };

  const openDeletePopup = productId => {
    setProductToDelete(productId);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setProductToDelete(null);
    setShowDeletePopup(false);
  };
  const handleDeleteProduct = async () => {
    try {
      console.log('Deleting product:', productToDelete);
      await AdminApi.deleteAdminProduct(productToDelete);
  
      const updatedProductList = productData.filter(product => product.id !== productToDelete);
      console.log('Updated product list:', updatedProductList);
      setProductData(updatedProductList);
  
      closeDeletePopup();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const openEditPopup = (product) => {
    setEditingProduct(product);
    setShowEditPopup(true);
  };
  
  const closeEditPopup = () => {
    setEditingProduct(null);
    setShowEditPopup(false);
  };


  const handleEditProduct = async (editedProduct) => {
    try {
      const response = await AdminApi.putAdminProduct(editedProduct.productId, editedProduct);
      console.log('Product edited successfully:', response.data);
  
      // Оновіть стан або виконайте інші дії за необхідності
    } catch (error) {
      console.error('Error editing product:', error);
      // Обробте помилку від сервера
    }
  };




  return (
    <>
      <div className="title">
        <h1>Привіт Тетяно 👋🏼,</h1>
      </div>
      <div className="product">
        <div className="product-header">
          <div className="product-header-title">
            <h2>Усі продукти</h2>
            <p>Активні продукти</p>
          </div>
          <div className="product-header-add">
          <a className='button-add-product' onClick={openAddProductPopup}>
          <img src={add} /> Додати товар
          </a>
          </div>
          <div className="product-header-search">
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
        <div className="product-list">
          <div className="product-list-title">
            <p className="list-img">Зображення</p>
            <p className="list-code">Код</p>
            <p className="list-name">Назва</p>
            <p className="list-category">Категорія</p>
            <p className="list-about">Опис</p>
            <p className="list-price">Ціна</p>
            <p className='list-edit'>Редагувати</p>
            <p className='list-delete'>Видалити</p>
          </div>
          <ul id="people-list">
          {displayPage().map(product => (
  <li key={product.id} className="list-li">
    <p className="list-img"><img
    src={product.avatarUrl}
    className='img-product'
    alt="Product Avatar"
  />
  </p>
    <p className="list-code">{product.itemProduct}</p>
    <p className="list-name">{product.titleProduct}</p>
    <p className="list-category">{product.category}</p>
    <p className="list-about">{product.aboutProduct}</p>
    <p className="list-price">{product.priceProduct} грн</p>
    <p className='list-edit'><a onClick={() => openEditPopup(product)}><img src={edit}/></a></p>
    <p className='list-delete'><a onClick={() => {
    openDeletePopup(product.id);
  }}><img src={delet}/></a></p>
  </li>
))}

</ul>
        {showAddProductPopup && (<AddProductPopup onClose={closeAddProductPopup} onAddProduct={handleAddProduct} />)}
        {showDeletePopup && (<DeletePopup onCancel={closeDeletePopup} onConfirm={handleDeleteProduct} />)}
        {showEditPopup && (<EditProductPopup product={editingProduct} onClose={() => closeEditPopup()} onSave={handleEditProduct}/>)}

          <div id="searchResult"></div>
        </div>
        <div className="product-pages">
          <p>
            Showing data {currentPage} to {Math.min(currentPage * itemsPerPage, productData.length)} of {productData.length}
          </p>
          <ul className="product-pages-list">
            <li className="product-pages-li-back">
              <a href="#" onClick={() => handlePageClick(currentPage - 1)}>
                {'<'}
              </a>
            </li>
            {Array.from({ length: Math.ceil(productData.length / itemsPerPage) }).map((_, index) => (
              <li key={index + 1} className={`product-pages-li ${currentPage === index + 1 ? 'product-pages-li-on' : ''}`}>
                <a href="#" onClick={() => handlePageClick(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="product-pages-li-next">
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

export default ProductList;