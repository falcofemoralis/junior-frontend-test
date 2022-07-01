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
        <div className='category__products__container'>
          <div className='category__products'>
            {products.map(product => (
              <CategoryProduct product={product} key={product.name} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
