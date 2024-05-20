import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import Product from '../components/Product';
import CustomNotification from '../components/CustomNotification';
import { RootState } from '../redux/store';
import ProductType from '../types/ProductType'; // Import ProductType type without curly braces to resolve the first issue
import '../styles/ProductList.css';

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
  
  
  class ProductList extends Component<Props, State> {
    state: State = {
      cart: [],
      filter: 'all',
      sortOrder: 'asc',
      isFilterListOpen: false,
      searchQuery: '',
      showNotification: false,
      currentBannerIndex: 0,
    };
  
    bannerInterval: NodeJS.Timeout | null = null;
  
    products: ProductType[] = [
      { id: 1, name: 'Glossier', price: 98, description: 'Glossier You XL Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2737690-main-zoom.jpg?imwidth=332' },
      { id: 2, name: 'LANEIGE', price: 24, description: 'Lip Sleeping Mask Intense Hydration with Vitamin C', imageUrl: 'https://www.sephora.com/productimages/sku/s1966258-main-zoom.jpg?imwidth=332' },
      { id: 3, name: 'Summer Fridays', price: 24, description: 'Lip Butter Balm for Hydration & Shine', imageUrl: 'https://www.sephora.com/productimages/sku/s2495497-main-zoom.jpg?imwidth=332' },
      { id: 4, name: 'Dior', price: 135, description: 'Miss Dior Blooming Bouquet', imageUrl: 'https://www.sephora.com/productimages/sku/s1725423-main-zoom.jpg?imwidth=332' },
      { id: 5, name: 'Rare Beauty', price: 23, description: 'Soft Pinch Liquid Blush', imageUrl: 'https://www.sephora.com/productimages/sku/s2640241-main-zoom.jpg?imwidth=332' },
      { id: 6, name: 'The Ordinary', price: 9, description: 'Hyaluronic Acid 2% + B5 Hydrating Serum', imageUrl: 'https://www.sephora.com/productimages/sku/s2031375-main-zoom.jpg?imwidth=332' },
      { id: 7, name: 'Glow Recipe', price: 35, description: 'Watermelon Glow Niacinamide Hue Drops', imageUrl: 'https://www.sephora.com/productimages/sku/s2742195-main-zoom.jpg?imwidth=500' },
      { id: 8, name: 'HUDA BEAUTY', price: 24, description: 'Easy Bake Loose Baking & Setting Powder', imageUrl: 'https://www.sephora.com/productimages/sku/s2739415-main-zoom.jpg?imwidth=500' },
      { id: 9, name: 'Saie', price: 25, description: 'Dew Blush Blendable Liquid Blush', imageUrl: 'https://www.sephora.com/productimages/sku/s2742989-main-zoom.jpg?imwidth=500' },
      { id: 10, name: 'Glossier', price: 14, description: 'Balm Dotcom Lip Balm and Skin Salve', imageUrl: 'https://www.sephora.com/productimages/sku/s2649788-main-zoom.jpg?imwidth=500' },
      { id: 11, name: 'Drunk Elephant', price: 38, description: 'D-Bronzi™ Bronzing Drops with Peptides', imageUrl: 'https://www.sephora.com/productimages/sku/s2404721-main-zoom.jpg?imwidth=500' },
      { id: 12, name: 'Charlotte Tilbury', price: 25, description: 'Lip Cheat Lip Liner', imageUrl: 'https://www.sephora.com/productimages/sku/s2736148-main-zoom.jpg?imwidth=500' },
    
    ];
  
    banners: string[] = [
      'https://french-house.kz/upload/ammina.optimizer/jpg-webp/q80/upload/iblock/389/pch3uqxvax51z0i8g2cimfbzhs0btk0x.webp',
      'https://french-house.kz/upload/ammina.optimizer/png-webp/q80/upload/iblock/984/me4ks58o194q9q7z18vob2ltr95e03ec.webp',
      'https://french-house.kz/upload/ammina.optimizer/jpg-webp/q80/upload/iblock/e15/5ql0biu5p161pyevd4tnmkxnkbpdmntv.webp',
      'https://french-house.kz/upload/ammina.optimizer/jpg-webp/q80/upload/iblock/a56/sid2aurqre8twts8fwkhdhilzaj4ty5l.webp',
      
    ];
  
    componentDidMount() {
      // Start the banner slideshow
      this.bannerInterval = setInterval(this.nextBanner, 5000); // Change 5000 to the desired interval in milliseconds
    }
  
    componentWillUnmount() {
      // Clear the banner interval when component unmounts
      if (this.bannerInterval) clearInterval(this.bannerInterval);
    }
  
    nextBanner = () => {
      // Switch to the next banner
      this.setState((prevState) => ({
        currentBannerIndex: (prevState.currentBannerIndex + 1) % this.banners.length,
      }));
    };
  
    prevBanner = () => {
      // Switch to the previous banner
      this.setState((prevState) => ({
        currentBannerIndex: prevState.currentBannerIndex === 0 ? this.banners.length - 1 : prevState.currentBannerIndex - 1,
      }));
    };
  
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
        <div>
          <div className="container">
            <div className="banner-container">
              {this.banners.map((banner, index) => (
                <img
                  key={index}
                  src={banner}
                  alt="Banner"
                  style={{
                    borderRadius: '8px',
                    objectFit: 'cover',
                    width: '100%',
                    display: index === currentBannerIndex ? 'block' : 'none',
                    animation: 'fade 1s ease-in-out',
                  }}
                />
              ))}
              <span className="prev" onClick={this.prevBanner}>
                &#10094;
              </span>
              <span className="next" onClick={this.nextBanner}>
                &#10095;
              </span>
            </div>
  
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
  
            <h2 className="bestsellers-label">BESTSELLERS</h2>
            <div className="product-container">
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
                <Link to="/skincare"><img className="skin" src='https://www.sephora.com/contentimages/2024-jan-skincare-site-desktop-category-content-tile-release.jpg?imwidth=500'/></Link>
              <Link to="/perfume"><img className="perfume" src='https://www.sephora.com/contentimages/2024-q1-fragrance-site-desktop-category-content-tile-2818.jpg?imwidth=500'></img></Link>
              <Link to="/makeup"><img className="makeup" src='https://www.sephora.com/contentimages/2024-4-4-rare-beauty-fos-soft-pinch-powder-blush-site-desktop-category-content-tile-en-us.jpg?imwidth=500'></img></Link>
              </div>
            </div>
            {showNotification && <CustomNotification message="Item added to the cart!" />}
          </div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductList);