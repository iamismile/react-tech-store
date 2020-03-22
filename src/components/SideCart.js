import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from '../context';

export default function SideCart() {
  const context = useContext(ProductContext);
  const { isCartOpen, closeCart, cart } = context;

  return (
    <CartWrapper show={isCartOpen} onClick={closeCart}>
      <p>cart items</p>
    </CartWrapper>
  );
}

const CartWrapper = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  width: 100%;
  height: 100%;
  background: var(--mainGrey);
  z-index: 1;
  border-left: 4px solid var(--primaryColor);
  transition: var(--mainTransition);
  transform: ${props => (props.show ? 'translateX(0)' : 'translateX(100%)')};
  @media (min-width: 576px) {
    width: 20rem;
  }
`;
