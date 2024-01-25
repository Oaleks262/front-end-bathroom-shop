import React, { useState } from 'react';
import './AddProductPopup.css';
import { AdminApi } from '../../../assets/api/api';


const AddProductPopup = ({ onClose, onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    avatarUrl: '', 
    itemProduct: '',
    titleProduct: '',
    aboutProduct: '',
    priceProduct: '',
    category: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setNewProduct((prevProduct) => ({ ...prevProduct, avatarUrl: file }));
  };
  

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('avatarUrl', newProduct.avatarUrl);
      formData.append('titleProduct', newProduct.titleProduct);
      formData.append('aboutProduct', newProduct.aboutProduct);
      formData.append('priceProduct', newProduct.priceProduct);
      formData.append('category', newProduct.category);
  
      const response = await AdminApi.postAdminProduct(formData);
      onAddProduct(response.data);
      onClose();
    } catch (error) {
      console.error('Помилка додавання товару:', error);
    }
  };
  

  return (
    <div className='background-add'>
    <div className="add-product-popup">
      <label>Фото:</label>
      <input className='add-product-file' type="file" accept="image/*" onChange={handleImageUpload} />

      <label>Категорія:</label>
      <select className='add-product-category' name="category" value={newProduct.category} onChange={handleChange}>
        <option value="">Оберіть категорію</option>
        <option value="Шипуча суміш для ванни">Шипуча суміш для ванни</option>
        <option value="Морська сіль для ванни">Морська сіль для ванни</option>
        <option value="Праліне">Праліне</option>
        <option value="Бомбочки для ванни">Бомбочки для ванни</option>
        <option value="Подарункові бокси">Подарункові бокси</option>
        <option value="Розпродаж">Розпродаж</option>
      </select>

      <label>Назва товару:</label>
      <input className='add-product-name' type="text" name="titleProduct" value={newProduct.titleProduct} onChange={handleChange} />

      <label>Опис товару:</label>
      <textarea className='add-product-about' name="aboutProduct" value={newProduct.aboutProduct} onChange={handleChange} />

      <label>Ціна товару:</label>
      <input className='add-product-price' type="text" name="priceProduct" value={newProduct.priceProduct} onChange={handleChange} />
      <div className='add-product-button'>
      <button className='add-yes' onClick={handleAddProduct}>Додати товар</button>
      <button className='add-no' onClick={onClose}>Закрити</button>
      </div>
    </div>
    </div>
  );
};

export default AddProductPopup;
