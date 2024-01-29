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
                       <li><a href="#">Товари</a></li>
                       <li><a href="#">Консультація</a></li>
                       <li><a href="#">Відгуки</a></li>
                       <li><a href="#">Про нас</a></li>
                    </ul>
                </nav>
                <a className='shooping-button'><img src={shooping}/>Корзина</a>
        </div>
    )
}

export default Header;