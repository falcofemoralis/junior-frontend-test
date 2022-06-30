import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product.type';
import './CategoryProduct.scss';

interface CategoryProductProps {
  product: Product;
}
export default class CategoryProduct extends React.Component<CategoryProductProps, unknown> {
  render() {
    return (
      <Link className='product' to='/product'>
        <img className='product__image' src={this.props.product.gallery[0]} alt={this.props.product.name} />
        <span className='product__name'>{this.props.product.name}t</span>
        <span className='product__price'>$50.00</span>
      </Link>
    );
  }
}
