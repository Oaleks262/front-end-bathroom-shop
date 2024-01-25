import React, { useState } from 'react';
import { AdminApi } from '../../../assets/api/api';
import './AddProductPopup.css';

const AddProductPopup = ({ onClose, onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    avatarUrl: '', // Тут буде шлях до файлу
    itemProduct: '',
    titleProduct: '',
    aboutProduct: '',
    priceProduct: '',
    category: '', // Додали поле для категорії товару
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageUpload = (e) => {
    // Опціонально, якщо ви бажаєте дозволити користувачам завантажувати зображення
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        avatarUrl: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('avatar', newProduct.avatarUrl);
    formData.append('titleProduct', newProduct.titleProduct);
    formData.append('aboutProduct', newProduct.aboutProduct);
    formData.append('priceProduct', newProduct.priceProduct);
    formData.append('category', newProduct.category);
  
    AdminApi.postAdminProduct(formData)
      .then(response => {
        console.log('Продукт додано успішно:', response.data);
        onAddProduct(response.data.product);
        onClose();
      })
      .catch(error => {
        console.error('Помилка при додаванні продукту:', error);
      });
  };
  return (
    <div className="add-product-popup">
      <label>Фото:</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <label>Категорія:</label>
      <select name="category" value={newProduct.category} onChange={handleChange}>
        <option value="">Оберіть категорію</option>
        <option value="Шипуча суміш для ванни">Шипуча суміш для ванни</option>
        <option value="Морська сіль для ванни">Морська сіль для ванни</option>
        <option value="Праліне">Праліне</option>
        <option value="Бомбочки для ванни">Бомбочки для ванни</option>
        <option value="Подарункові бокси">Подарункові бокси</option>
        <option value="Розпродаж">Розпродаж</option>
      </select>

      <label>Назва товару:</label>
      <input type="text" name="titleProduct" value={newProduct.titleProduct} onChange={handleChange} />

      <label>Опис товару:</label>
      <textarea name="aboutProduct" value={newProduct.aboutProduct} onChange={handleChange} />

      <label>Ціна товару:</label>
      <input type="text" name="priceProduct" value={newProduct.priceProduct} onChange={handleChange} />

      <button onClick={handleAddProduct}>Додати товар</button>
      <button onClick={onClose}>Закрити</button>
    </div>
  );
};

export default AddProductPopup;
