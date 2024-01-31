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
                       <li><a className='header-navigat-button' >Товари</a></li>
                       <li><a className='header-navigat-button' >Консультація</a></li>
                       <li><a className='header-navigat-button' >Відгуки</a></li>
                       <li><a className='header-navigat-button' >Про нас</a></li>
                    </ul>
                </nav>
                <a className='shooping-button'><img src={shooping}/>Кошик</a>
        </div>
    )
}

export default Header;