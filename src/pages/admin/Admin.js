import React, { useContext, useState, useEffect } from 'react';
import "./Admin.css";
import { Navigate } from 'react-router-dom';
import SideMenu from './saidmenu/Saidmenu';
import CustomerList from './CustomerList/CustomerList';
import { AuthContext } from '../../assets/api/AuthContext';
import { AdminApi } from '../../assets/api/api';

const Admin = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { isAuthenticated, logout } = useContext(AuthContext);
   
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }
      
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
        <div className='dashboard'>
            <SideMenu setSelectedMenu={setSelectedMenu} />
            <div className="content">
                {selectedMenu === 'customers' && <CustomerList />}
            </div>
        </div>
    );

}
export default Admin;