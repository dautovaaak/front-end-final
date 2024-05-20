import React, { Component } from 'react';
import '../styles/FAQ.css';

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: -1,
    };
  }

  toggleAnswer = (index) => {
    this.setState((prevState) => ({
      expandedIndex: prevState.expandedIndex === index ? -1 : index,
    }));
  };

  render() {
    const faqs = [
      {
        question: 'How to make an order?',
        answer: 'To place an order, select the products you want, add them to your cart and follow the ordering instructions.',
      },
      {
        question: 'How can I find out the status of my order?',
        answer: 'You can track the status of your order in the "My Orders" section after logging into your account.',
      },
    ];

    const { expandedIndex } = this.state;

    return (
      <div className='f-container'>
        <h2>FAQ</h2>
        <ul>
          {faqs.map((faq, index) => (
            <li className='f-item' key={index}>
              <strong onClick={() => this.toggleAnswer(index)}>{faq.question}</strong>
              {expandedIndex === index && <p>{faq.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FAQ;
