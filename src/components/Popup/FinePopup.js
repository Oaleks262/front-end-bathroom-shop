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
        <div className='fine-popup-content-div-text'>
        <p>Ваше замовлення було оформлено успішно. 
            Для підтвердження очікуйте телефоного дзвінка від нашого менеджера
        </p>
        <p>Або можете перевірити статус замовлення у нашому 
            <a href='https://t.me/BathroomshopBot'> чат-боті</a>.</p>

        </div>
        <div className='fine-popup-content-div-button'>
            <a className='fine-popup-content-button' href='https://t.me/BathroomshopBot'>Перейти у чат бот</a>
        </div>
       
    </div>
    </div>
</div>
)

}

export default FinePopup;