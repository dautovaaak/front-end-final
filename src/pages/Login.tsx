import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/loginActions';

interface Props {
  username: string;
  password: string;
}

const Login: React.FC<Props> = ({}) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Dispatch action to store user data in Redux store
      dispatch(loginUser(user));

      // Redirect to user account page
      // Replace '/account' with your actual account page URL
      window.location.href = '/myaccount';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form>
        <label className="hidden-label">Username</label>
        <input className="in-login" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label className="hidden-label">Password</label>
        <input className="in-login" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button className="login-button" type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
