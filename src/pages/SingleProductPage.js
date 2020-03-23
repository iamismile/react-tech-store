import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import singleProductImg from '../images/singleProductBcg.jpeg';
import { ProductContext } from '../context';

export default function SingleProductPage() {
  const context = useContext(ProductContext);
  const { singleProduct, addToCart, loading } = context;
  const { company, description, id, price, title, image } = singleProduct;

  return (
    <>
      <Hero img={singleProductImg} title="single product" />
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
              <img
                src={`../${image}`}
                alt="single product"
                className="img-fluid"
              />
            </div>
            <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
              <h5 className="text-title mb-4">model: {title}</h5>
              <h5 className="text-capitalize text-muted">company: {company}</h5>
              <h5 className="text-main text-capitalize mb-4">
                price: ${price}
              </h5>
              <p className="text-capitalize text-title mb-3">
                some info about produtc :{' '}
              </p>
              <p>{description}</p>
              <button
                className="main-link"
                style={{ margin: '0.75rem' }}
                onClick={() => addToCart(id)}
              >
                add to cart
              </button>
              <Link
                to="/products"
                className="main-link"
                style={{ margin: '0.75rem' }}
              >
                back to products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
