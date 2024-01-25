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
    <div className="edit-product-popup">
      <h2>Edit Product</h2>
      <label>Title:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <label>Category:</label>
      <input
        type="text"
        value={editedCategory}
        onChange={(e) => setEditedCategory(e.target.value)}
      />
      <label>About:</label>
      <textarea
        value={editedAbout}
        onChange={(e) => setEditedAbout(e.target.value)}
      />
      <label>Price:</label>
      <input
        type="number"
        value={editedPrice}
        onChange={(e) => setEditedPrice(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditProductPopup;
