import React, { useContext, useState, useEffect } from 'react';
import "./Admin.css";
import { Navigate } from 'react-router-dom';
import SideMenu from './saidmenu/Saidmenu';
import CustomerList from './CustomerList/CustomerList';
import ProductList from './ProductList/ProductList';
import { AuthContext } from '../../assets/api/AuthContext';

const Admin = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { isAuthenticated, logout } = useContext(AuthContext);
   
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }

    return (
        <div className='dashboard'>
            <SideMenu setSelectedMenu={setSelectedMenu} logout={logout} />
            <div className="content">
                {selectedMenu === 'product' && <ProductList />}
                {selectedMenu === 'customers' && <CustomerList />}
                {selectedMenu === 'feedback' && <CustomerList />}
            </div>
        </div>
    );

}
export default Admin;