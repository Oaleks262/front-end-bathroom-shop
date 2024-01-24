import React from 'react';
import './DeletePopup.css';
import imgdel from '../../../assets/img/admin/rectangle-1.png'

const DeletePopup = ({ onCancel, onConfirm }) => {
  return (
    <div className='background-delete'>
    <div className="delete-popup">
        <div className='delete-cont'>
            <img src={imgdel}/>
            <h3>Ви впевнені, що хочете видалити оці дані?</h3>
            <p>Оці дані, більше повернути не можна буде</p>
        </div>
        <div className='delete-button'>
        <button className='delete-no' onClick={onCancel}>Ні</button>
            <button className='delete-yes' onClick={onConfirm}>Так</button>
        </div>

    </div>
    </div>
  );
};

export default DeletePopup;
