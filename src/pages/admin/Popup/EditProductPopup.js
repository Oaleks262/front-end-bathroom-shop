import React, { useState } from 'react';

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
    <div className='edit-product-category'>
      <h2>Edit Product</h2>
      <label>Title:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
    </div>
    <div className='edit-product-category'>
      <label>Category:</label>
      <input
        type="text"
        value={editedCategory}
        onChange={(e) => setEditedCategory(e.target.value)}
      />
      </div >
      <div className='edit-product-about'>
      <label>About:</label>
      <textarea
        value={editedAbout}
        onChange={(e) => setEditedAbout(e.target.value)}
      />
    </div>
       <div className='edit-product-price'>
      <label>Price:</label>
      <input
        type="number"
        value={editedPrice}
        onChange={(e) => setEditedPrice(e.target.value)}
      />
      </div>

      <div className='edit-product-button'>
      <button className='edit-product-yes' onClick={handleSave}>Save</button>
      <button className='edit-product-no' onClick={onClose}>Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default EditProductPopup;
