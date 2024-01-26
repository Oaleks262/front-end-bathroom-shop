import React, { useState } from 'react';
import './EditProductPopup.css'

const EditProductPopup = ({ product, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(product.titleProduct);
  const [editedCategory, setEditedCategory] = useState(product.category);
  const [editedAbout, setEditedAbout] = useState(product.aboutProduct);
  const [editedPrice, setEditedPrice] = useState(product.priceProduct);

  const handleSave = () => {
    onSave({
      productId: product.id,
      titleProduct: editedTitle,
      category: editedCategory,
      aboutProduct: editedAbout,
      priceProduct: editedPrice,
    });
    onClose();
  };

  return (

    
    <div className="edit-product-background">
        <div className='edit-product-popup'>

    
    <label>Назва товару:</label>
      <input
        className='edit-product-category'
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />

    <label>Категорія:</label>
       <select className='edit-product-category' name="category"  value={editedCategory}>
        <option value="">Оберіть категорію</option>
        <option value="Шипуча суміш для ванни">Шипуча суміш для ванни</option>
        <option value="Морська сіль для ванни">Морська сіль для ванни</option>
        <option value="Праліне">Праліне</option>
        <option value="Бомбочки для ванни">Бомбочки для ванни</option>
        <option value="Подарункові бокси">Подарункові бокси</option>
        <option value="Розпродаж">Розпродаж</option>
      </select>

      
      <label>Опис товару:</label>
      <textarea
        className='edit-product-about'
        name="aboutProduct"
        value={editedAbout}
        onChange={(e) => setEditedAbout(e.target.value)}
      />


       <label>Ціна товару:</label>
      <input
        className='edit-product-price'
        type="text"
        name="priceProduct"
        value={editedPrice}
        onChange={(e) => setEditedPrice(e.target.value)} />

      <div className='edit-product-button'>
      <button className='edit-product-yes' onClick={handleSave}>Зберегти</button>
      <button className='edit-product-no' onClick={onClose}>Скасувати</button>
      </div>
    </div>
    </div>
  );
};

export default EditProductPopup;
