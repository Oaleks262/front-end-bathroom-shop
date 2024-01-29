import React from 'react';
import './Reviers.css';
import bombs from '../../assets/img/landing/reviers/bathroombombs.svg';

const Reviers = () =>{


    return(
        <div className='reviers'>
            <div className='content-padding'>
                <div className='reviers-content'>
                    <div className='reviers-content-text'>
                        <h3>
                            Чому саме наша продукція
                        </h3>
                        <p>
                        У нашому асортименті ви знайдете неперевершену продукцію яка зроблять ваш ванний час ще приємнішим та корисним. Наша продукція з натуральних інгредієнтів, що забезпечує вашій шкірі м'якість та гладкість. Кожна бомбочка містить унікальні аромати, які не лише заспокоюють ваше тіло, але й піднімають настрій. Виберіть аромат, який вам подобається, і насолоджуйтесь часом для себе.

                        </p>

                    </div>
                    <div className='reviers-content-picture'>
                    <img src={bombs} className='reviers-content-img'/>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Reviers;