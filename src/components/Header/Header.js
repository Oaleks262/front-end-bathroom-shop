import React from 'react';
import logo from '../../assets/img/logo.svg'
import { Link } from 'react-router-dom';
import shooping from '../../assets/img/landing/header/shopping.svg'
import './Header.css'

const Header = () =>{

    const feedbackLink = 'about-feedback'
    const reviersLink = 'reviers'
    return(
        <div className="header">
                <a className='header-link' href="/"><img src={logo} className="header-logo" id="start"alt="logo"/></a>
                <nav className='nav-header'>
                    <ul className='header-navigat'>
                       <li><a className='header-navigat-button' >Продукція</a></li>
                       <li><a className='header-navigat-button' >Рекомендації</a></li>
                       <li><a className='header-navigat-button' >Оплата та доставка</a></li>
                       <li><Link to={`/#${feedbackLink}`} className='header-navigat-button' >Відгуки</Link></li>
                       <li><Link to={`/#${reviersLink}`} className='header-navigat-button' >Про нас</Link></li>
                    </ul>
                </nav>
                <Link to="/shopping" className="shooping-button">
        <img src={shooping} alt="shopping" />
        Кошик
      </Link>
        </div>
    )
}

export default Header;