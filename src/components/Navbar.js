import React, { useContext } from 'react';
import { ProductContext } from '../context';
import styled from 'styled-components';
import { FaBars, FaCartPlus } from 'react-icons/fa';
import logo from '../images/logo.svg';

export default function Navbar() {
  const context = useContext(ProductContext);
  const { cartItems, handleSidebar, handleCart } = context;

  return (
    <NavWrapper>
      <div className="nav-center">
        <FaBars className="nav-icon" onClick={handleSidebar} />
        <img src={logo} alt="tech store logo" />
        <div className="nav-cart">
          <FaCartPlus className="nav-icon" onClick={handleCart} />
          <div className="cart-items">{cartItems}</div>
        </div>
      </div>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--mainGrey);
  border-bottom: 3px solid var(--primaryColor);
  z-index: 2;
  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1170px;
    margin: 0 auto;
  }
  .nav-icon {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .nav-cart {
    position: relative;
  }
  .cart-items {
    position: absolute;
    background: var(--primaryColor);
    color: var(--mainWhite);
    font-size: 0.85rem;
    top: -8px;
    right: -10px;
    padding: 0 5px;
    border-radius: 50%;
  }
`;
