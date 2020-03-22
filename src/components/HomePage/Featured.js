import React, { useContext } from 'react';
import Product from '../Product';
import { Link } from 'react-router-dom';
import Title from '../Title';
import { ProductContext } from '../../context';

export default function Featured() {
  const context = useContext(ProductContext);
  const { featuredProducts } = context;

  return (
    <section className="py-5">
      <div className="container">
        {/* title */}
        <Title title="featured products" center="true" />
        {/* prodcuts */}
        <div className="row">
          {featuredProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="row mt-5">
          <div className="col text-center">
            <Link to="/products" className="main-link">
              our products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
