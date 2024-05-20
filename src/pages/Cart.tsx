import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/actions/cartActions';
import Notification from '../components/CustomNotification';
import { CartItem } from '../types/CartItem'; // Import CartItem type
import '../styles/Cart.css';

interface State {
  showNotification: boolean; 
}

class Cart extends Component<{ cartItems: CartItem[]; removeFromCart: (productId: number) => void; updateCartItemQuantity: (productId: number, newQuantity: number) => void; }, State> {
  constructor(props: { cartItems: CartItem[]; removeFromCart: (productId: number) => void; updateCartItemQuantity: (productId: number, newQuantity: number) => void; }) {
    super(props);

    this.state = {
      showNotification: false,
    };
  }

  handleRemoveFromCart = (productId: number) => {
    this.props.removeFromCart(productId);
    this.handleNotification();
  };

  handleQuantityChange = (productId: number, newQuantity: number) => {
    this.props.updateCartItemQuantity(productId, newQuantity);
  };

  handleNotification = () => {
    this.setState({ showNotification: true });
    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 2000);
  };

  render() {
    const { cartItems } = this.props;
    const { showNotification } = this.state;

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <div className='cart-container'>
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        this.handleQuantityChange(item.id, parseInt(e.target.value, 10))
                      }
                    />
                  </label>
                  <button onClick={() => this.handleRemoveFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div>
          <strong>Your total:</strong> ${total.toFixed(2)}
        </div>

        {showNotification && <Notification message="Item removed from the cart!" />}
      </div>
    );
  }
}

const mapStateToProps = (state: { cart: { items: CartItem[]; }; }) => {
  return {
    cartItems: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFromCart: (productId: number) => dispatch(removeFromCart(productId)),
    updateCartItemQuantity: (productId: number, newQuantity: number) =>
      dispatch(updateCartItemQuantity(productId, newQuantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
