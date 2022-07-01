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
      <Link className='categoryProduct' to={`/product/${product.id}`}>
        <div className='categoryProduct__image__container'>
          {!product.inStock && <span className='categoryProduct__stock'>Out of Stock</span>}
          <img className={`categoryProduct__image ${!product.inStock ? 'categoryProduct__image-stock' : ''}`} src={product.gallery[0]} alt={product.name} />
        </div>
        <span className='categoryProduct__name'>{product.name}t</span>
        <span className='categoryProduct__price'>
          {product.prices[0].currency.symbol}
          {product.prices[0].amount}
        </span>
      </Link>
    );
  }
}
