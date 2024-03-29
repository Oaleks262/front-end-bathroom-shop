import React, { useState } from 'react';
import './EditOrderPopup.css'
    const EditOrderPopup = ({ order, onSave, onClose }) => {
        const [editedOrder, setEditedOrder] = useState(order);
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setEditedOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
          }));
        };
      
        const handleProductChange = (index, key, value) => {
          setEditedOrder((prevOrder) => {
            const updatedProductItems = [...prevOrder.productItems];
            updatedProductItems[index] = {
              ...updatedProductItems[index],
              [key]: value,
            };
            return {
              ...prevOrder,
              productItems: updatedProductItems,
            };
          });
        };
      
        const handleSaveClick = async () => {
          try {
            // Викликати функцію onSave зі зміненим замовленням
            await onSave(editedOrder);
            console.log(editedOrder)
            
            // Закрити вікно редагування після успішного збереження
            onClose();
          } catch (error) {
            console.error('Error saving changes:', error);
          }
        };

        return (
          <div className='edit-background'>
            <div className="edit-popup">
              <div className='edit-shop-fullname'>
              <label>
                First Name:
              </label>
              <input type="text" className='edit-text' name="firstName" value={editedOrder.firstName} onChange={handleInputChange} />
              <label>
                Last Name:
              </label>
              <input type="text" className='edit-text' name="lastName" value={editedOrder.lastName} onChange={handleInputChange} />
              </div>
              <div className='edit-shop-data'>
              <label>
                Phone Number:
              </label>
              <input type="text" className='edit-text' name="phone" value={editedOrder.phone} onChange={handleInputChange}/>
              <label>
                City:
              </label>
              <input type="text" className='edit-text' name="city" value={editedOrder.city} onChange={handleInputChange} />
              </div>
              <div className='edit-shop-post'>
              <label>
                 Post Office:
              </label>
              <input type="text" className='edit-text' name="postOffice" value={editedOrder.postOffice} onChange={handleInputChange} />
              <label>
                Number Post:
              </label>
              <input type="text" className='edit-text' name="numberPost" value={editedOrder.numberPost} onChange={handleInputChange} />
              </div>
              <label>
                Products:
                </label>
                <ul className='edit-text-ul'>
                {Array.isArray(editedOrder.productItems) && editedOrder.productItems.map((productItem, index) => (
      <li key={index} className='edit-li'>
        <input 
        className='edit-text-li'
          type="text"
          value={productItem.title}
          onChange={(e) => handleProductChange(index, 'title', e.target.value)}
        />
        <input
          type="number"
          className='edit-text-li'
          value={productItem.quantity}
          onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10))}
        />
      </li>
    ))}
                </ul>
              <label>
                Active Position:
              </label>
                <select className='edit-position' name="position" value={editedOrder.position} onChange={handleInputChange}>
                    <option value="new">Нове</option>
                    <option value="processing">В обробці</option>
                    <option value="rejection">Відхилено</option>
                    <option value="done">Виконано</option>
                </select>

                {editedOrder.position === "done" && ( 
                    <label>
                    TTH: 
                    <input
                    className='edit-text'
                    type="text"
                    name="ttn"
                    value={editedOrder.ttn}  
                    onChange={handleInputChange}
                  /></label>
                )}
              <div className='edit-order-button'>
                <button className='edit-order-yes' onClick={handleSaveClick}>Зберегти</button>
                <button className='edit-order-no' onClick={onClose}>Скасувати </button>
              </div>
            </div>
          </div>
          );
};

export default EditOrderPopup;
