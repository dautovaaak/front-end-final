import '../styles/MyAccount.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const MyAccount = () => {
  // Получаем данные пользователя из хранилища Redux
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);

  // Проверяем, загружены ли данные пользователя
  if (!loggedInUser) {
    return <div>Loading...</div>; 
  }

  // Отображаем данные пользователя
  return (
    <div>
      <h2>My Account</h2>
      <p>Username: {loggedInUser.username}</p>
      <p>Email: {loggedInUser.email}</p>
    </div>
  );
};

export default MyAccount;
