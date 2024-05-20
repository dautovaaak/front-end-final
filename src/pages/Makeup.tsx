import React, { Component } from 'react';
import { Dispatch } from 'redux';

import { connect } from 'react-redux';
import Product from '../components/Product';
import '../styles/Makeup.css';
import { addToCart } from '../redux/actions/cartActions';
import CustomNotification from '../components/CustomNotification';
import { RootState } from '../redux/store';
import ProductType from '../types/ProductType.js';



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
  
class Makeup extends Component<Props, State> {
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
      { id: 1, name: 'ILIA', price: 48, description: 'Super Serum Skin Tint SPF 40 Skincare Foundation', imageUrl: 'https://www.sephora.com/productimages/sku/s2333607-main-zoom.jpg?pb=allure-best-2020&imwidth=350' },
      { id: 2, name: 'Sephora', price: 14, description: 'Sephora Colorful® Shadow and Liner Pencil', imageUrl: 'https://www.sephora.com/productimages/sku/s1311067-main-zoom.jpg?pb=2023-03-sephora-value-2023&imwidth=350' },
      { id: 3, name: 'Charlotte Tilbury', price: 19, description: 'Hollywood Flawless Filter', imageUrl: 'https://www.sephora.com/productimages/sku/s2419786-main-zoom.jpg?imwidth=350' },
      { id: 4, name: 'NARS', price: 15, description: 'Radiant Creamy Concealer', imageUrl: 'https://www.sephora.com/productimages/sku/s2172310-main-zoom.jpg?imwidth=350' },
      { id: 5, name: 'Rare Beauty', price: 23, description: 'Soft Pinch Liquid Blush', imageUrl: 'https://www.sephora.com/productimages/sku/s2640241-main-zoom.jpg?imwidth=332' },
      { id: 6, name: 'Dior', price: 40, description: 'Lip Glow Oil', imageUrl: 'https://www.sephora.com/productimages/sku/s2316248-main-zoom.jpg?imwidth=350' },
      { id: 7, name: 'Charlotte Tilbury', price: 40, description: 'Beauty Highlighter Wand', imageUrl: 'https://www.sephora.com/productimages/sku/s2366524-main-zoom.jpg?imwidth=500' },
      { id: 8, name: 'Benefit Cosmetics', price: 33, description: 'Benetint Liquid Lip Blush & Cheek Tint', imageUrl: 'https://www.sephora.com/productimages/sku/s2264638-main-zoom.jpg?imwidth=500' },
      { id: 9, name: 'SEPHORA COLLECTION', price: 14, description: 'Rouge Lacquer Long-Lasting Lipstick', imageUrl: 'https://www.sephora.com/productimages/sku/s2066371-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=500' },
      { id: 10, name: 'Dior', price: 49, description: 'BACKSTAGE Glow Face Palette', imageUrl: 'https://www.sephora.com/productimages/sku/s2748093-main-zoom.jpg?imwidth=500' },
      { id: 11, name: 'The Ordinary', price: 15, description: 'Multi-Peptide Lash and Brow Serum', imageUrl: 'https://www.sephora.com/productimages/sku/s2532588-main-zoom.jpg?imwidth=500' },
      { id: 12, name: 'ILIA', price: 13, description: 'Mini Limitless Lash Lengthening Mascara', imageUrl: 'https://www.sephora.com/productimages/sku/s2217933-main-zoom.jpg?pb=2020-03-allure-clean-2019&imwidth=500' },
      { id: 13, name: 'MAKEUP BY MARIO', price: 32, description: 'SoftSculpt® Shaping Stick', imageUrl: 'https://www.sephora.com/productimages/sku/s2457299-main-zoom.jpg?pb=allure-2022-bestofbeauty-badge&imwidth=500' },
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
        <h2 className="makeup-label">MAKEUP</h2>

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
          <div className='banner-makeup'>
            <img src='https://www.sephora.com/contentimages/2023-12-19-rare-new-exclusive-body-collection-site-desktop-mobile-top-cat-nth-level-including-brand-pages-content-grid-tile-en-us-can.jpg?imwidth=500'/>
          </div>
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
          <div className='banner-makeup'>
            <img src='https://www.sephora.com/contentimages/categorybanners/2023-feb-contour-site-desktop-mobile-category-content-tile-us-can-release.png?imwidth=500'/>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Makeup);
