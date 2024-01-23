import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Main from './pages/main/Main';
import Admin from './pages/admin/Admin';
import Login from './pages/login/login';
import { AuthProvider } from "./assets/api/AuthContext"

function App() {
  return (
    <AuthProvider>
    
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/success" element={<Navigate to="/admin" />} />
          </Routes>
        </div>

      </AuthProvider>
  );
}

export default App;