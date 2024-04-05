import React from 'react';
import './Different.css'
import bathbom from '../../assets/img/landing/different/bathbom.svg';
import etic from '../../assets/img/landing/different/etic.svg';
import delivery from '../../assets/img/landing/different/delivery.svg';
import money from '../../assets/img/landing/different/money.svg'


const Different = () => {

    return (
        <div className='different'>
            <div className='content-padding'>
                <div className='different-cont'>
                    <div className='different-text'>
                        <h3>Чому вигдіно з нами?</h3>
                        <p>Декілька пунктів яку ви отримуєте вигод</p>
                    </div>
                    <div className='different-icon'>
                        <div className='different-icon-1'>
                            <div className='different-icon-2'>
                                <img  src={bathbom} alt='bathroom'/>
                                <h3>Продукція</h3>
                                <p>Завжди необхідна і доречна</p>
                            </div>
                            <div className='different-icon-2'>
                                <img  src={etic} alt='etic'/>
                                <h3>Якість</h3>
                                <p>Виготовлена без консервантів і спиртів</p>
                            </div>
                        </div>
                        <div className='different-icon-1'>
                            <div className='different-icon-2'>
                                <img  src={delivery} alt='delivery'/>
                                <h3>Доставка</h3>
                                <p>Отримаєте замовлення у найкоротші терміни</p>
                                
                            </div>
                            <div className='different-icon-2'>
                                <img  src={money} alt='money'/>
                                <h3>Економія</h3>
                                <p>З нашою продукцією ви заощадите і будете задоволені</p>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )


}

export default Different;