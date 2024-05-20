import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Product from '../components/Product';
import '../styles/Skincare.css';
import { addToCart } from '../redux/actions/cartActions';
import CustomNotification from '../components/CustomNotification';
import { RootState } from '../redux/store';
import ProductType from '../types/ProductType';


interface Props {
  addToCart: (product: ProductType) => void;
}

interface State {
  cart: ProductType[];
  filter: string;
  sortOrder: string;
  isFilterListOpen: boolean;
  searchQuery: string;
  showNotification: boolean;
  currentBannerIndex: number;
}
  

class Skincare extends Component<Props, State> {
  state: State = {
    cart: [],
    filter: 'all',
    sortOrder: 'asc',
    isFilterListOpen: false,
    searchQuery: '',
    showNotification: false,
    currentBannerIndex: 0,
  };

  products: ProductType[] = [
      { id: 1, name: 'Summer Fridays', price: 24, description: 'Lip Butter Balm for Hydration & Shine', imageUrl: 'https://www.sephora.com/productimages/sku/s2715035-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=350' },
      { id: 2, name: 'The Ordinary', price: 9, description: 'Hyaluronic Acid 2% + B5 Hydrating Serum', imageUrl: 'https://www.sephora.com/productimages/sku/s2031375-main-zoom.jpg?pb=2020-03-allure-best-2019&imwidth=350' },
      { id: 3, name: 'Glow Recipe', price: 16, description: 'Watermelon Glow PHA + BHA Pore-Tight Toner', imageUrl: 'https://www.sephora.com/productimages/sku/s2421519-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=350' },
      { id: 4, name: 'Sephora', price: 6, description: 'Hydrating Face Masks', imageUrl: 'https://www.sephora.com/productimages/sku/s2614394-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=350' },
      { id: 5, name: 'Drunk Elephant', price: 23, description: 'Protini™ Polypeptide Firming Refillable Moisturizer', imageUrl: 'https://www.sephora.com/productimages/sku/s2025633-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=350' },
      { id: 6, name: 'Tatcha', price: 25, description: 'Plumping & Hydrating Moisturizer', imageUrl: 'https://www.sephora.com/productimages/sku/s2181006-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=350' },
      { id: 7, name: 'Drunk Elephant', price: 49, description: 'Intensive Hydration Serum with Hyaluronic Acid', imageUrl: 'https://www.sephora.com/productimages/sku/s1785856-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=500' },
      { id: 8, name: 'The Ordinary', price: 13, description: 'Glycolic Acid 7% Exfoliating Toner', imageUrl: 'https://www.sephora.com/productimages/sku/s2031508-main-zoom.jpg?imwidth=500' },
      { id: 9, name: 'Supergoop!', price: 48, description: 'Glowscreen SPF 40 Sunscreen with Hyaluronic Acid ', imageUrl: 'https://www.sephora.com/productimages/sku/s2535656-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=500' },
      { id: 10, name: 'Youth To The People', price: 68, description: 'Antioxidant Refillable Cleanser', imageUrl: 'https://www.sephora.com/productimages/sku/s1863588-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=500' },
      { id: 11, name: 'Paulas Choice', price: 23, description: 'Mini Skin Perfecting 2% BHA Liquid Exfoliant', imageUrl: 'https://www.sephora.com/productimages/sku/s2421394-main-zoom.jpg?imwidth=500' },
      { id: 12, name: 'Caudalie', price: 12, description: 'Mini Grape Water Moisturizing Face Mist', imageUrl: 'https://www.sephora.com/productimages/sku/s1434190-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=500' },
  
    ];
  

    handleSortChange = (newSortOrder: string) => {
      this.setState({ sortOrder: newSortOrder });
    };
  
    handleAddToCart = (product: ProductType) => {
      this.props.addToCart(product);
      this.setState({ showNotification: true });
  
      setTimeout(() => {
        this.setState({ showNotification: false });
      }, 2000);
    };
  
    handleClearSearch = () => {
      this.setState({ searchQuery: '' });
    };

  render() {
    const { sortOrder, searchQuery, showNotification, currentBannerIndex } = this.state;
  
      const sortedProducts = this.products
  .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  .sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

    return (
      <div className="container">
        <div className='banner-skin'>
          <img src='https://www.sephora.com/contentimages/2023-11-25-slotting-moisturizers-by-skin-type-site-rwd-home-page-hero-banner-US-CA-handoff_01.jpg?imwidth=1090'/>
          <img src='https://www.sephora.com/contentimages/2023-holiday-launch-site-home-page-rwd-hero-banner-newness-2843-release-us-image-only.jpg?imwidth=1090'/>
        </div>

        <h2 className="skincare-label">SKINCARE</h2>
        <div className="search-sort-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            />
            {searchQuery && (
              <span className="clear-icon" onClick={this.handleClearSearch}>
                &#10006;
              </span>
            )}
          </div>
          <div className='so'>
            <div className="sort-container">
              <div className="sort-label">Sort by Price:</div>
              <label>
                <select className="sort-button" onChange={(e) => this.handleSortChange(e.target.value)}>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        

        <div className="product-list">
          {sortedProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              onAddToCart={() => this.handleAddToCart(product)}
            />
          ))}
          
        </div>
        {showNotification && <CustomNotification message="Item added to the cart!" />}
      </div>
      
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart.items,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addToCart: (product: ProductType) => dispatch(addToCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Skincare);
