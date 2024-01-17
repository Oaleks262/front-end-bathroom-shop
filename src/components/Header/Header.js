import React from 'react';
import logo from '../../assets/img/logo.svg'

const Header = () =>{


    return(
        <div className="header">
            <div>
                <a href="#"><img src={logo} alt="logo"/></a>
                <nav>
                    <ul>
                       <li><a href="#">Товари</a></li>
                       <li><a href="#">Консультація</a></li>
                       <li><a href="#">Відгуки</a></li>
                       <li><a href="#">Про нас</a></li>
                    </ul>



                </nav>
            </div>
        </div>
    )
}

export default Header;