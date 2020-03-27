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
    loading: true,
    // filtering Products
    search: '',
    price: 0,
    min: 0,
    max: 0,
    company: 'all',
    shipping: false
  };

  // === sidebar & sidecart handling ===
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

    // featured products
    const featuredProducts = storeProducts.filter(
      item => item.featured === true
    );

    // get max price
    let maxPrice = Math.max(...storeProducts.map(item => item.price));

    this.setState(
      {
        storeProducts,
        filteredProducts: storeProducts,
        featuredProducts,
        cart: this.getStorageCart(),
        singleProduct: this.getStorageProduct(),
        loading: false,
        price: maxPrice,
        max: maxPrice
      },
      () => {
        this.addTotals();
      }
    );
  };

  // get cart from local storage
  getStorageCart = () => {
    let cart;
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    } else {
      cart = [];
    }
    return cart;
  };

  // get product from local storage
  getStorageProduct = () => {
    return localStorage.getItem('singleProduct')
      ? JSON.parse(localStorage.getItem('singleProduct'))
      : {};
  };

  // get totals
  getTotals = () => {
    let subTotal = 0;
    let cartItems = 0;
    this.state.cart.forEach(item => {
      subTotal += item.total;
      cartItems += item.count;
    });

    subTotal = parseFloat(subTotal.toFixed(2));
    let tax = subTotal * 0.2;
    tax = parseFloat(tax.toFixed(2));
    let total = subTotal + tax;
    total = parseFloat(total.toFixed(2));

    return {
      cartItems,
      subTotal,
      tax,
      total
    };
  };

  // add totals
  addTotals = () => {
    const totals = this.getTotals();
    this.setState({
      cartItems: totals.cartItems,
      cartSubTotal: totals.subTotal,
      cartTax: totals.tax,
      cartTotal: totals.total
    });
  };

  // sync storage
  syncStorage = () => {
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  };

  // add to cart
  addToCart = id => {
    let tempCart = [...this.state.cart];
    const tempProducts = [...this.state.storeProducts];
    let tempItem = tempCart.find(item => item.id === id);
    if (!tempItem) {
      tempItem = tempProducts.find(item => item.id === id);
      const total = tempItem.price;
      const cartItem = { ...tempItem, count: 1, total };
      tempCart = [...this.state.cart, cartItem];
    } else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }

    this.setState(
      () => ({ cart: tempCart }),
      () => {
        this.addTotals();
        this.syncStorage();
        this.openCart();
      }
    );
  };

  // set single product
  setSingleProduct = id => {
    let product = this.state.storeProducts.find(item => item.id === id);
    localStorage.setItem('singleProduct', JSON.stringify(product));
    this.setState({
      singleProduct: { ...product },
      loading: false
    });
  };

  // === cart functionality ===
  // increment
  handleIncrement = id => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count++;
    cartItem.total = cartItem.count * cartItem.price;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));
    this.setState(
      () => ({
        cart: [...tempCart]
      }),
      () => {
        this.addTotals();
        this.syncStorage();
      }
    );
  };

  // decrement
  handleDecrement = id => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count = cartItem.count - 1;
    if (cartItem.count === 0) {
      this.handleRemoveItem(id);
    } else {
      cartItem.total = cartItem.count * cartItem.price;
      cartItem.total = parseFloat(cartItem.total.toFixed(2));
      this.setState(
        () => ({
          cart: [...tempCart]
        }),
        () => {
          this.addTotals();
          this.syncStorage();
        }
      );
    }
  };

  // remove item
  handleRemoveItem = id => {
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    this.setState(
      {
        cart: [...tempCart]
      },
      () => {
        this.addTotals();
        this.syncStorage();
      }
    );
  };

  // clear cart
  handleClearCart = () => {
    this.setState(
      {
        cart: []
      },
      () => {
        this.addTotals();
        this.syncStorage();
      }
    );
  };

  // handle filtering
  handleChange = e => {
    console.log(e);
  };

  sortData = () => {};

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
          setSingleProduct: this.setSingleProduct,
          handleIncrement: this.handleIncrement,
          handleDecrement: this.handleDecrement,
          handleRemoveItem: this.handleRemoveItem,
          handleClearCart: this.handleClearCart,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };
