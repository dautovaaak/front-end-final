import React, { Component } from 'react';
import Chat from '../components/Chat';
import '../styles/Support.css';

class Support extends Component {
  render() {
    return (
      <div className='sup-container'>
        <h2 className='service'>Customer Service</h2>
        <p>Chat with us:</p>
        <Chat />
      </div>
    );
  }
}

export default Support;
