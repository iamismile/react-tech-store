import React, { Component } from 'react';
import { linkData } from './linkData';
import { socialData } from './socialData';
import { items } from './productData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    isSidebarOpen: false,
    isCartOpen: false,
    cartItems: 0,
    links: linkData,
    socialIcons: socialData,
    cart: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProduct: {},
    loading: false
  };

  componentDidMount() {
    this.setProducts(items);
  }

  // setProducts
  setProducts = products => {
    const storeProducts = products.map(item => {
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      const product = { id, ...item.fields, image };
      return product;
    });

    const featuredProducts = storeProducts.filter(
      item => item.featured === true
    );

    this.setState({
      storeProducts,
      filteredProducts: storeProducts,
      featuredProducts,
      cart: this.getStorageCart(),
      singleProduct: this.getStorageProduct(),
      loading: false
    });
  };

  // get cart from local storage
  getStorageCart = () => {
    return [];
  };

  // get product from local storage
  getStorageProduct = () => {
    return {};
  };

  // get totals
  getTotals = () => {};

  // add totals
  addTotals = () => {};

  // sync storage
  syncStorage = () => {};

  // add to cart
  addToCart = id => {
    console.log(id);
  };

  // set single product
  setSingleProduct = id => {
    console.log(id);
  };

  // handle sidebar
  handleSidebar = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
  };

  // handle cart
  handleCart = () => {
    this.setState({
      isCartOpen: !this.state.isCartOpen
    });
  };

  // close cart
  closeCart = () => {
    this.setState({
      isCartOpen: false
    });
  };

  // open cart
  openCart = () => {
    this.setState({
      isCartOpen: true
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleSidebar: this.handleSidebar,
          handleCart: this.handleCart,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addToCart: this.addToCart,
          setSingleProduct: this.setSingleProduct
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };
