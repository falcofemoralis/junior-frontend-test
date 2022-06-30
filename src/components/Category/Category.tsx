import React from 'react';
import { Product } from '../../types/product.type';
import CategoryProduct from '../CategoryProduct/CategoryProduct';
import './Category.scss';

interface CategoryProps {
  products: Product[];
}
export default class Category extends React.Component<CategoryProps, unknown> {
  render() {
    return (
      <div className='category'>
        <h2 className='category__title'>Category name</h2>
        <div className='category__products'>
          {this.props.products.map(product => (
            <CategoryProduct product={product} key={product.name} />
          ))}
        </div>
      </div>
    );
  }
}
