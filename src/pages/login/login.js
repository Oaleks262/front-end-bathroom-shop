import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../assets/api/AuthContext';
import { AdminApi } from '../../assets/api/api';
import arrowleft from '../../assets/img/login/arrow-left.svg';
import logo from '../../assets/img/logo.svg'
import facebook from '../../assets/img/login/icons8-facebook.svg'
import instagram from '../../assets/img/login/icons8-instagram.svg'

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await AdminApi.loginAdmin({ email, password });
      
      // Опціонально можна перевірити статус відповіді
      if (response.status === 200) {
        const userData = response.data;
        const token = await AdminApi.setToken(userData.token);
        localStorage.setItem('authToken', token);
        login(token); // Успішний логін
      } else {
        // Обробка невірного статусу, наприклад, показати повідомлення про помилку
        setError({ message: 'Invalid credentials' });
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // Завершуємо загрузку, навіть якщо є помилка
    }
  };
  

  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className='login-page'>
      <div className='left-page-login'> 
      <div className='header-left-page-login'>
      <a className='exit' href='/#logo'><img src={arrowleft}/>Повернутись до сайту</a>
      </div>
      <div className='logo-left-page-login'>
        <img className='login-logo' src={logo}/>
        <h3>Bathroom shop</h3>
      </div>
      <div className='footer-left-page-login'>
        <a href='#'><img src={facebook}/></a>
        <a href='#'><img src={instagram}/></a>
      </div>
      </div>
      <div className='right-page-login'>
      <div className='login'>
      <h2>Вхід</h2>
      <p>Введіть будь ласка ваші дані</p>
      <form onSubmit={handleLogin}>
        <div className='labelemail'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='labelpassword'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='loginbutton' type="submit" disabled={loading}>
          {loading ? 'Завантаження' : 'Вхід'} 
        </button>
        
          
      </form>
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </div>

      </div>
    

    </div>
  );
};

export default Login;