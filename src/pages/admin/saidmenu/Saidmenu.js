import React, { useState } from 'react';
import '.Saidmenu.css';

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
          <img src="img/setting-1.svg" alt="logo" />
          <h3>Dashboard</h3>
        </div>
        <p>v.01</p>
      </div>
      <div className="nav-dashboard">
        <div className="butt-cont">
          <img src="img/key-square.svg" alt="key" />
          <h4>Dashboard</h4>
        </div>
      </div>
      <div className="nav-dashboard-mob">
        <div className="butt-cont">
          <img src="img/key-square.svg" alt="key" />
          <h4>Dashboard</h4>
        </div>
        <img className="stat" src="img/stat.svg" alt="stat" />
        <img className="close" src="img/close.svg" alt="close" />
      </div>
      <nav className="nav">
        <a href="#" className={`nav-product ${selectedMenu === 'product' ? 'active' : ''}`} onClick={() => handleMenuClick('product')}>
          <div className="butt-link">
            <div className="butt-cont">
              <img src="img/3d-square-1.svg" alt="3d" className="nav-product-img" />
              <h4>Product</h4>
            </div>
            <img src="img/chevron-right-2-1.svg" alt="right" className="nav-product-img" />
          </div>
        </a>
        <a className={`nav-customers ${selectedMenu === 'customers' ? 'active' : ''}`} href="#" onClick={() => handleMenuClick('customers')}>
          <div className="butt-link">
            <div className=" butt-cont">
              <img src="img/user-square-1.svg" alt="user" />
              <h4>Customers</h4>
            </div>
            <img src="img/chevron-right-2-1.svg" alt="right" />
          </div>
        </a>
        {/* Додайте інші пункти меню за аналогією */}
      </nav>
      <div className="login-user">
        <a href="#" className="login-user-link">
          <img src="img/ellipse-8.svg" alt="user-photo" />
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