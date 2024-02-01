import React from 'react';
import logo from '../../assets/img/logo.svg'
import shooping from '../../assets/img/landing/header/shopping.svg'
import './Header.css'

const Header = () =>{


    return(
        <div className="header">
                <img src={logo} className="header-logo"alt="logo"/>
                <nav className='nav-header'>
                    <ul className='header-navigat'>
                       <li><a className='header-navigat-button' >Продукція</a></li>
                       <li><a className='header-navigat-button' >Рекомендації</a></li>
                       <li><a className='header-navigat-button' >Оплата та доставка</a></li>
                       <li><a className='header-navigat-button' href='#about-feedback'>Відгуки</a></li>
                       <li><a className='header-navigat-button' href='#reviers' >Про нас</a></li>
                    </ul>
                </nav>
                <a className='shooping-button'><img src={shooping}/>Кошик</a>
        </div>
    )
}

export default Header;