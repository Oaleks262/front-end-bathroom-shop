import React, { useState } from 'react';

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
            <div className="edit-popup">
              <h2>Edit Order</h2>
              <label>
                First Name:
                <input type="text" name="firstName" value={editedOrder.firstName} onChange={handleInputChange} />
              </label>
              <label>
                Last Name:
                <input type="text" name="lastName" value={editedOrder.lastName} onChange={handleInputChange} />
              </label>
              <label>
                Phone Number:
                <input type="text" name="phoneNumber" value={editedOrder.phone} onChange={handleInputChange}/>
              </label>
              <label>
                City:
                <input type="text" name="city" value={editedOrder.city} onChange={handleInputChange} />
              </label>
              <label>
                Post Office:
                <input type="text" name="postOffice" value={editedOrder.email} onChange={handleInputChange} />
              </label>
              <label>
                Number Post:
                <input type="text" name="numberPost" value={editedOrder.numberPost} onChange={handleInputChange} />
              </label>
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
              </label>
              <div>
                <button onClick={handleSaveClick}>Save Changes</button>
                <button onClick={onClose}>Cancel</button>
              </div>
            </div>
          );
};

export default EditOrderPopup;
