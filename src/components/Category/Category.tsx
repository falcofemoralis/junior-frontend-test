import React from 'react';
import { Product } from '../../types/product.type';
import CategoryProduct from '../CategoryProduct/CategoryProduct';
import './Category.scss';

interface CategoryProps {
  category: string;
  products: Product[];
}
export default class Category extends React.Component<CategoryProps> {
  render() {
    const { category, products } = this.props;
    return (
      <div className='category'>
        <h2 className='category__title'>{category}</h2>
        <ul className='category__products'>
          {products.map(product => (
            <li key={product.id} className='category__products__item'>
              <CategoryProduct product={product} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
