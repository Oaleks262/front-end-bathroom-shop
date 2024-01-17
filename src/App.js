import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Main from './pages/main/Main';
import Login from './pages/login/login'
import Admin from './pages/admin/Admin';

const App = () =>{
  return (
    <div className="App">
 <Routes>
 <Route path="/" element={<Main />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/success" element={<Navigate to="/admin" />} />
 </Routes>
    </div>
  );
}

export default App;
