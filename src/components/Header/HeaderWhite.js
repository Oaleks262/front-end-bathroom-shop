import React from 'react';
import logo from '../../assets/img/logo.svg'
import shooping from '../../assets/img/landing/header/shopping.svg'
import { Link } from 'react-router-dom';
import './HeaderWhite.css'

const HeaderWhite = () =>{
    const feedbackLink = 'about-feedback'
    const reviersLink = 'reviers'
    

    return(
        <div className="header-white">
                     <Link to="/">
        <img src={logo} alt="logo"className="header-logo" />
</Link>
                <nav className='nav-header-white'>
                    <ul className='header-navigat-white'>
                       <li><a href='/product'  className='header-navigat-button-white' >Продукція</a></li>
                       <li><a className='header-navigat-button-white' >Рекомендації</a></li>
                       <li><a className='header-navigat-button-white' >Оплата та доставка</a></li>
                       <li><Link to={`/#${feedbackLink}`} className='header-navigat-button-white' >Відгуки</Link></li>
                       <li><Link to={`/#${reviersLink}`} className='header-navigat-button-white' >Про нас</Link></li>
                    </ul>
                </nav>
                <a href='/shopping' className='shooping-button-white'><img src={shooping}/>Кошик</a>
        </div>
    )
}

export default HeaderWhite;