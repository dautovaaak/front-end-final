import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item dropdown">
            <span className="dropdown-toggle">Catalog</span>
            <div className="dropdown-content">
              <Link to="/skincare">Skincare</Link>
              <Link to="/makeup">Makeup</Link>
              <Link to="/perfume">Perfume</Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/registration">Registration</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} />Cart</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
