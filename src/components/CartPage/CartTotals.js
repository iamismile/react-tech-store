import React, { useContext } from 'react';
import { ProductContext } from '../../context';
import PaypalBtn from './PaypalBtn';

export default function CartTotals({ history }) {
  const { handleClearCart, cartSubTotal, cartTax, cartTotal } = useContext(
    ProductContext
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col text-title text-center my-4">
          <button
            className="btn btn-outline-danger text-capitalize mb-4"
            onClick={handleClearCart}
          >
            clear cart
          </button>
          <h3>subtotal: ${cartSubTotal}</h3>
          <h3>tax: ${cartTax}</h3>
          <h3>total: ${cartTotal}</h3>
          <PaypalBtn
            history={history}
            cartTotal={cartTotal}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </div>
  );
}
