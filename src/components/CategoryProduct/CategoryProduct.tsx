import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product.type';
import './CategoryProduct.scss';

interface CategoryProductProps {
  product: Product;
}
export default class CategoryProduct extends React.Component<CategoryProductProps> {
  render() {
    const { product } = this.props;
    return (
      <Link className='product' to='/product'>
        <div className='product__image__container'>
          {!product.inStock && <span className='product__stock'>Out of Stock</span>}
          <img className={`product__image ${!product.inStock ? 'product__image-stock' : ''}`} src={product.gallery[0]} alt={product.name} />
        </div>
        <span className='product__name'>{product.name}t</span>
        <span className='product__price'>
          {product.prices[0].currency.symbol}
          {product.prices[0].amount}
        </span>
      </Link>
    );
  }
}
