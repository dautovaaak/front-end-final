import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Product from '../components/Product';
import '../styles/Perfume.css';
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
  
class Perfume extends Component<Props, State> {
  state: State = {
    cart: [],
    filter: 'all',
    sortOrder: 'asc',
    isFilterListOpen: false,
    searchQuery: '',
    showNotification: false,
    currentBannerIndex: 0,
  };


  products: ProductType[]= [
      { id: 1, name: 'Valentino', price: 35, description: 'Donna Born In Roma Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2249688-main-zoom.jpg?imwidth=350' },
      { id: 2, name: 'Carolina Herrera', price: 19, description: 'Mini Good Girl Blush Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2691095-main-zoom.jpg?imwidth=350' },
      { id: 3, name: 'Gucci', price: 35, description: 'Mini Gorgeous Gardenia and Gorgeous Magnolia Perfume Set', imageUrl: 'https://www.sephora.com/productimages/sku/s2692580-main-zoom.jpg?imwidth=350' },
      { id: 4, name: 'Dior', price: 135, description: 'Miss Dior Blooming Bouquet', imageUrl: 'https://www.sephora.com/productimages/sku/s1725423-main-zoom.jpg?imwidth=332' },
      { id: 5, name: 'CHANEL', price: 120, description: 'COCO MADEMOISELLE Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s513168-main-zoom.jpg?imwidth=350' },
      { id: 6, name: 'Yves Saint Laurent', price: 85, description: 'Libre Eau De Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2371888-main-zoom.jpg?imwidth=350' },
      { id: 7, name: 'GUERLAIN', price: 130, description: 'Mon Guerlain Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s1915537-main-zoom.jpg?imwidth=500' },
      { id: 8, name: 'BURBERRY', price: 180, description: 'Her Elixir Eau de Parfum Intense', imageUrl: 'https://www.sephora.com/productimages/sku/s2608735-main-zoom.jpg?imwidth=500' },
      { id: 9, name: 'Jo Malone London', price: 20, description: 'Cologne Discovery Set', imageUrl: 'https://www.sephora.com/productimages/sku/s2616555-main-zoom.jpg?imwidth=500' },
      { id: 10, name: 'Prada', price: 165, description: 'Paradoxe Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2591170-main-zoom.jpg?imwidth=500' },
      { id: 11, name: 'Marc Jacobs Fragrances', price: 137, description: 'Daisy Love Eau So Sweet', imageUrl: 'https://www.sephora.com/productimages/sku/s2176071-main-zoom.jpg?imwidth=500' },
      { id: 12, name: 'KAYALI', price: 138, description: 'VANILLA | 28', imageUrl: 'https://www.sephora.com/productimages/sku/s2163970-main-zoom.jpg?imwidth=500' },
    
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
        <div className="banner-perfume">
          <img
            src="https://www.sephora.com/contentimages/meganav/large/2023-holiday-site-desktop-global-navigation-button-minis-us-can-3066-release.jpg?imwidth=588"
            alt="Holiday Banner"
          />
          <img src='https://www.sephora.com/contentimages/meganav/large/2020-9-14-site-desktop-global-navigation-button-banner-sol-de-janeiro.jpg?imwidth=588'/>
          <img src='https://www.sephora.com/contentimages/2023-sc-best-skin-ever-powder-foundation-site-desktop-global-navigation-button-590x590-us-can-kohls.jpg?imwidth=588'/>
        </div>

        <h2 className="perfume-label">PERFUME</h2>

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

export default connect(mapStateToProps, mapDispatchToProps)(Perfume);
