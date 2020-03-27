import React, { useContext } from 'react';
import { ProductContext } from '../../context';
import Title from '../Title';
import Product from '../Product';
import ProductFilter from './ProductFilter';

export default function Products() {
  const context = useContext(ProductContext);
  const { filteredProducts } = context;

  return (
    <section className="py-5">
      <div className="container">
        {/* title */}
        <Title center title="our products" />
        {/* Filter */}
        <ProductFilter />
        {/* total count */}
        <div className="row">
          <div className="col mx-auto">
            <h6 className="text-title">
              total products: {filteredProducts.length}
            </h6>
          </div>
        </div>
        <hr />
        {/* products */}
        <div className="row py-5">
          {filteredProducts.length === 0 ? (
            <div className="col text-title text-center">
              sorry, no items matched your searched!
            </div>
          ) : (
            filteredProducts.map(product => (
              <Product key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
