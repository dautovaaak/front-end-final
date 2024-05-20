import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <nav>
          <ul>
            <li>
              <Link to="/delivery">Delivery</Link>
            </li>
            <li>
              <Link to="/support">Customer Service</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/map">Find a store nearby</Link>
            </li>
          </ul>
        </nav>
        <p className="copyright"><span className="circle">©</span> All rights reserved</p>
      </footer>
    );
  }
}

export default Footer;
