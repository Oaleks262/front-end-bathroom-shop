import React, { useState } from 'react';
import logoMob from '../../assets/img/logo.svg'
import menuMobile from '../../assets/img/landing/mobileHeader/menu-mobile.svg'
import './Header.Mobile.css'
import shooping from '../../assets/img/landing/header/shopping.svg'
import { Link } from 'react-router-dom';



const HeaderMobile = () => {
    const feedbackLink = 'about-feedback'
    const reviersLink = 'reviers'
    const [isMenuOp, setIsMenuOp] = useState(false);


    const openMenu = () => {
        setIsMenuOp(!isMenuOp);
    };

    return (
        <div className='header-mobile'>
            <div className='header-mobile-content'>
            <div className='header-mobile-logo'>
                <Link className='header-link' to="/">
                    <img className='header-mobile-logo-img' src={logoMob}/>
                </Link>
            </div>
            <div className='header-mobile-text'>
                <h2>
                    Bathroom shop
                </h2>
            </div>
            <div className='header-mobile-menu'>
                <button onClick={openMenu} className='header-mobile-menu-button'><img src={menuMobile}/></button>
            </div>
            </div>
            <div className={`header-mobile-nav ${isMenuOp ? 'open' : ''}`}>
                <ul className='header-mobile-navigat'>
                       <li><a href='/product' onClick={openMenu} className='header-mobile-button' >Продукція</a></li>
                       <li><a onClick={openMenu} className='header-mobile-button' >Рекомендації</a></li>
                       <li><a onClick={openMenu} className='header-mobile-button' >Оплата та доставка</a></li>
                       <li><Link to={`/#${feedbackLink}`} onClick={openMenu} className='header-mobile-button' >Відгуки</Link></li>
                       <li><Link to={`/#${reviersLink}`} onClick={openMenu} className='header-mobile-button' >Про нас</Link></li>
                </ul>
                <a href='/shopping' onClick={openMenu} className='shooping-button-header-mobile'><img src={shooping}/>Кошик</a>
            </div>

        </div>
    )

}

export default HeaderMobile;