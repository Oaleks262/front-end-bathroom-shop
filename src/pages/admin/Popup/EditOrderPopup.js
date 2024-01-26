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
              <input type="text" name="firstName" value={editedOrder.firstName} onChange={handleInputChange} />
              <label>
                Last Name:
              </label>
              <input type="text" name="lastName" value={editedOrder.lastName} onChange={handleInputChange} />
              </div>
              <div className='edit-shop-data'>
              <label>
                Phone Number:
              </label>
              <input type="text" name="phone" value={editedOrder.phone} onChange={handleInputChange}/>
              <label>
                City:
              </label>
              <input type="text" name="city" value={editedOrder.city} onChange={handleInputChange} />
              </div>
              <label>
                Post Office:
              </label>
              <input type="text" name="postOffice" value={editedOrder.email} onChange={handleInputChange} />
              <label>
                Number Post:
              </label>
              <input type="text" name="numberPost" value={editedOrder.numberPost} onChange={handleInputChange} />
              <label>
                Products:
                <ul>
                {Array.isArray(editedOrder.productItems) && editedOrder.productItems.map((productItem, index) => (
      <li key={index}>
        <input
          type="text"
          value={productItem.title}
          onChange={(e) => handleProductChange(index, 'title', e.target.value)}
        />
        <input
          type="number"
          value={productItem.quantity}
          onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10))}
        />
      </li>
    ))}
                </ul>
              </label>
              <label>
                Active Position:
              </label>
                <select className='' name="position" value={editedOrder.position} onChange={handleInputChange}>
                    <option value="new">Нове</option>
                    <option value="processing">В обробці</option>
                    <option value="rejection">Відхилено</option>
                    <option value="done">Виконано</option>
                </select>

                {editedOrder.position === "done" && ( 
                    <input
                    type="text"
                    name="ttn"
                    value={editedOrder.ttn}  
                    onChange={handleInputChange}
                  />
                )}
              <div>
                <button onClick={handleSaveClick}>Save Changes</button>
                <button onClick={onClose}>Cancel</button>
              </div>
            </div>
          </div>
          );
};

export default EditOrderPopup;
