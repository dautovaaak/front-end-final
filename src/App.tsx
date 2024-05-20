import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Delivery from './pages/Delivery';
import Support from './pages/Support';
import FAQ from './pages/FAQ';
import './styles/App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccount from './pages/MyAccount';
import Skincare from './pages/Skincare';
import Makeup from './pages/Makeup';
import Perfume from './pages/Perfume';
import Cart from './pages/Cart';
import ErrorBoundary from './components/ErrorBoundary';
import Map from './pages/Map';

export interface AppProps {
  registeredUser: any;
  user ?: any;
}

interface AppState {
  cartItems: any[]; 
  registeredUser: any | null;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      cartItems: [],
      registeredUser: null,
    };
  }

  handleRegistrationSuccess = (user: any) => {
    this.setState({ registeredUser: user });
  };

  addToCart = (product: any) => {
    const { cartItems } = this.state;
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      this.setState((prevState) => ({
        cartItems: prevState.cartItems.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } else {
      this.setState((prevState) => ({
        cartItems: [...prevState.cartItems, { ...product, quantity: 1 }],
      }));
    }
  };

  

  render() {
    const { registeredUser } = this.state;
    return (
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-container">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/support" element={<Support />} />
                <Route path="/login" element={<Login username={''} password={''} />} />
                <Route path="/registration" element={<Registration username={''} password={''} email={''} firstName={''} lastName={''} gender={''} onRegistrationSuccess={function (userData: any): void {
                    throw new Error('Function not implemented.');
                  } } />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/skincare" element={<Skincare />} />
                <Route path="/makeup" element={<Makeup />} />
                <Route path="/perfume" element={<Perfume />} />
                <Route path="/cart" element={<Cart />} />
                <Route path='/map' element={<Map />} />
              </Routes>              
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
