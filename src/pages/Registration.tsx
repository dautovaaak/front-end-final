import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Registration.css';

interface Props {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  onRegistrationSuccess: (userData: any) => void;
}

const Registration: React.FC<Props> = ({ onRegistrationSuccess }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  
  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/registration', {
        username,
        password,
        email,
        firstName,
        lastName,
        gender,
      });

      const registeredUser = response.data;
      onRegistrationSuccess(registeredUser);

      setRegistrationMessage('Registration successful');

      setUsername('');
      setPassword('');
      setEmail('');
      setFirstName('');
      setLastName('');
      setGender('');
    } catch (error) {
      console.error('Registration failed:', (error as any).response || (error as any).message || error);
    }
  };

  return (
    <div className='reg-container'>
      <h2>Registration</h2>
      <form>
        <label className="hidden-label">First Name</label>
        <input className="in-login" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <br />
        <label className="hidden-label">Last Name</label>
        <input className="in-login" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <br />
        <label className="hidden-label">Email</label>
        <input className="in-login" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label className="hidden-label">Username</label>
        <input className="in-login" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label className="hidden-label">Password</label>
        <input className="in-login" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <select className="in-reg" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button className="login-button" type="button" onClick={handleRegistration}>Register</button>
        {registrationMessage && <div>{registrationMessage}</div>}
      </form>
    </div>
  );
};

export default Registration;
