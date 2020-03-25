import React, { useContext } from 'react';
import { ProductContext } from '../../context';
import CartItem from './CartItem';

export default function CartList() {
  const {
    cart,
    handleIncrement,
    handleDecrement,
    handleRemoveItem
  } = useContext(ProductContext);

  return (
    <div className="container-fluid">
      {/* row */}
      <div className="row">
        <div className="col">
          {cart.length === 0 ? (
            <h1 className="text-title text-center my-4">
              your cart is currently empty
            </h1>
          ) : (
            <>
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  cartItem={item}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
