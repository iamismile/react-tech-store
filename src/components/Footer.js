import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from '../context';

export default function Footer() {
  const context = useContext(ProductContext);
  const { socialIcons } = context;

  return (
    <FooterWrapper>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6">
            <p className="text-capitalize">
              copyright &copy; tech store {new Date().getFullYear()}. all rights
              reserved
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-around">
            {socialIcons.map(item => (
              <a key={item.id} href={item.url}>
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background: var(--darkGrey);
  color: var(--mainWhite);
  .icon {
    font-size: 1.5rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
  }
  .icon:hover {
    color: var(--primaryColor);
    cursor: pointer;
  }
`;
