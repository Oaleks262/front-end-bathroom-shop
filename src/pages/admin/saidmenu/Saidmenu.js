import React, { useState } from 'react';
import './Saidmenu.css';
import setting from "../../../assets/img/icon/setting-1.svg"
import square from '../../../assets/img/icon/3d-square-1.svg';
import usersquare from '../../../assets/img/icon/user-square-1.svg'
import key  from '../../../assets/img/icon/key-square.svg';
import right from '../../../assets/img/icon/chevron-right-2-1.svg';
import ellipse from '../../../assets/img/icon/ellipse-8.svg';
import messed from '../../../assets/img/icon/message-question-1.svg';
import { AdminApi } from '../../../assets/api/api';
import menu from '../../../assets/img/admin/menu.svg'
import exit from '../../../assets/img/admin/sync.svg'






const SideMenu = ({ setSelectedMenu , logout }) => {

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await AdminApi.logoutAdmin(token);
      logout(token); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="side-menu">
      <div className="side-menu-logo">
        <div className="side-menu-logo-block">
          <img src={setting} alt="logo" />
          <h3>Bathroom shop</h3>
          <p>admin</p>  
        </div>
        < div className="nav-dashboard-mob">
          <a><img src={menu} alt="menu" /></a>
    </div>  
      </div>
      <div className="nav-dashboard">
        <div className="butt-cont">
          <img src={key} alt="key" />
          <h4>Меню</h4>
        </div>
      </div>
      <nav className="nav">
        <a href="#" className={`nav-product ${setSelectedMenu === 'product' ? 'active' : ''}`} onClick={() => setSelectedMenu('product')}>
          <div className="butt-link">
            <div className="butt-cont">
              <img src={square} alt="3d" className="nav-product-img" />
              <h4>Продукт</h4>
            </div>
            <img src={right} alt="right" className="nav-product-img" />
          </div>
        </a>
      <a className={`nav-customers ${setSelectedMenu === 'customers' ? 'active' : ''}`} href="#" onClick={() => setSelectedMenu('customers')}>
        <div className="butt-link">
          <div className=" butt-cont">
            <img src={usersquare} alt="user" />
            <h4>Замовлення</h4>
          </div>
          <img src={right} alt="right" />
        </div>
      </a>
     <a className={`nav-customers ${setSelectedMenu === 'feedback' ? 'active' : ''}`} href="#" onClick={() => setSelectedMenu('feedback')}>
          <div className="butt-link">
            <div className=" butt-cont">
              <img src={messed} alt="user" />
              <h4>Відгуки</h4>
            </div>
            <img src={right} alt="right" />
          </div>
        </a>
       
      </nav>
      <nav className="nav-mob">
        <a href="#" className={`nav-product ${setSelectedMenu === 'product' ? 'active' : ''}`} onClick={() => setSelectedMenu('product')}>
          <div className="butt-link">
            <div className="butt-cont">
              <img src={square} alt="3d" className="nav-product-img" />
              <h4>Продукт</h4>
            </div>
            <img src={right} alt="right" className="nav-product-img" />
          </div>
        </a>
      <a className={`nav-customers ${setSelectedMenu === 'customers' ? 'active' : ''}`} href="#" onClick={() => setSelectedMenu('customers')}>
        <div className="butt-link">
          <div className=" butt-cont">
            <img src={usersquare} alt="user" />
            <h4>Замовлення</h4>
          </div>
          <img src={right} alt="right" />
        </div>
      </a>
     <a className={`nav-customers ${setSelectedMenu === 'feedback' ? 'active' : ''}`} href="#" onClick={() => setSelectedMenu('feedback')}>
          <div className="butt-link">
            <div className=" butt-cont">
              <img src={messed} alt="user" />
              <h4>Відгуки</h4>
            </div>
            <img src={right} alt="right" />
          </div>
        </a>
        <a href="#" className='nav-exit' onClick={handleLogout}><img src={exit}/> Вихід</a>
      </nav>
      <div className="login-user">
        <a href="#" onClick={handleLogout} className="login-user-link">
          <img src={ellipse} alt="user-photo" />
          <div className="login-user-name">
            <h3>Тетяна</h3>
            <h5>Керівник</h5>
          </div>
        </a>
      </div>

    </div>
    
  );
}

export default SideMenu;