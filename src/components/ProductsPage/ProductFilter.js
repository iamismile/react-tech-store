import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from '../../context';

export default function FilterProdutcs() {
  const {
    search,
    min,
    max,
    company,
    price,
    shipping,
    handleChange,
    storeProducts
  } = useContext(ProductContext);

  let companies = new Set();
  companies.add('all');
  for (let product in storeProducts) {
    companies.add(storeProducts[product]['company']);
  }
  companies = [...companies];

  return (
    <div className="row my-5">
      <div className="col mx-auto">
        <FilterWrapper>
          {/* text search */}
          <div>
            <label htmlFor="search">search products</label>
            <input
              type="text"
              id="search"
              name="search"
              value={search}
              className="filter-item"
              onChange={handleChange}
            />
          </div>
          {/* end of text search */}
          {/* category search */}
          <div>
            <label htmlFor="company">company</label>
            <select
              name="company"
              id="company"
              onChange={handleChange}
              value={company}
              className="filter-item"
            >
              {companies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          {/* end of category search */}
          {/* price range */}
          <div>
            <label htmlFor="price">
              <p className="mb-2">
                product-price : <span>${price}</span>
              </p>
            </label>
            <input
              type="range"
              name="price"
              id="price"
              min={min}
              max={max}
              value={price}
              className="filter-price"
              onChange={handleChange}
            />
          </div>
          {/* end of price range */}
          {/* free shipping */}
          <div>
            <label htmlFor="shipping" className="mx-2">
              free shipping
            </label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              value={shipping && true}
              onChange={handleChange}
            />
          </div>
          {/* end of free shipping */}
        </FilterWrapper>
      </div>
    </div>
  );
}

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  label {
    font-weight: bold;
    text-transform: capitalize;
  }
  .filter-item,
  .filter-price {
    display: block;
    width: 100%;
    background: transparent !important;
    border-radius: 0.5rem;
    border: 2px solid var(--darkGrey);
    outline: none;
  }
`;
