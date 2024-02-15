import React, { useState } from 'react';
import './FinePopup.css';


const FinePopup = ({ toPopup }) => {

return (
    <div className="fine-popup">
    <div className="fine-popup-content">
        <div className='fine-popup-close'>
        <a className="fine-close-button" onClick={toPopup}>×</a>
        </div>
        <div className='fine-popup-content-div'>
        <h2>Ваше замовлення оформлено</h2>
        <p>Ваше замовлення було оформлено успішно. 
            Для підтвердження очікуйте телефоного дзвінка від нашого менеджера
        </p>
        <p>Або можете перевірити статус замовлення у нашому<a href='#'>чат-боті</a>.</p>
       
    </div>
    </div>
</div>
)

}

export default FinePopup;