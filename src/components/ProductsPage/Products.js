import React, { useContext } from 'react';
import { ProductContext } from '../../context';
import Title from '../Title';
import Product from '../Product';

export default function Products() {
  const context = useContext(ProductContext);
  const { filteredProducts } = context;

  return (
    <section className="py-5">
      <div className="container">
        {/* title */}
        <Title center title="our products" />
        {/* products */}
        <div className="row py-5">
          {filteredProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
