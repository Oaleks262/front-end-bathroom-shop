import React, { useState } from 'react';
import './Saidmenu.css';
import setting from "../../../assets/img/icon/setting-1.svg"
import square from '../../../assets/img/icon/3d-square-1.svg';
import usersquare from '../../../assets/img/icon/user-square-1.svg'
import key  from '../../../assets/img/icon/key-square.svg';
import stat from '../../../assets/img/icon/stat.svg';
import close from '../../../assets/img/icon/close.svg';
import right from '../../../assets/img/icon/chevron-right-2-1.svg';
import ellipse from '../../../assets/img/icon/ellipse-8.svg';


const SideMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    // Тут ви можете викликати додаткові дії при кліку на пункт меню
  };

  return (
    <div className="side-menu">
      <div className="side-menu-logo">
        <div className="side-menu-logo-block">
          <img src={setting} alt="logo" />
          <h3>Dashboard</h3>
        </div>
        <p>v.01</p>
      </div>
      <div className="nav-dashboard">
        <div className="butt-cont">
          <img src={key} alt="key" />
          <h4>Dashboard</h4>
        </div>
      </div>
      <div className="nav-dashboard-mob">
        <div className="butt-cont">
          <img src={key} alt="key" />
          <h4>Dashboard</h4>
        </div>
        <img className="stat" src={stat} alt="stat" />
        <img className="close" src={close} alt="close" />
      </div>
      <nav className="nav">
        <a href="#" className={`nav-product ${selectedMenu === 'product' ? 'active' : ''}`} onClick={() => handleMenuClick('product')}>
          <div className="butt-link">
            <div className="butt-cont">
              <img src={square} alt="3d" className="nav-product-img" />
              <h4>Product</h4>
            </div>
            <img src={right} alt="right" className="nav-product-img" />
          </div>
        </a>
        <a className={`nav-customers ${selectedMenu === 'customers' ? 'active' : ''}`} href="#" onClick={() => handleMenuClick('customers')}>
          <div className="butt-link">
            <div className=" butt-cont">
              <img src={usersquare} alt="user" />
              <h4>Customers</h4>
            </div>
            <img src={right} alt="right" />
          </div>
        </a>
       
      </nav>
      <div className="login-user">
        <a href="#" className="login-user-link">
          <img src={ellipse} alt="user-photo" />
          <div className="login-user-name">
            <h3>Evano</h3>
            <h5>Project Manager</h5>
          </div>
        </a>
      </div>
    </div>
  );
}

export default SideMenu;