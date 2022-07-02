import React from 'react';
import { CartProduct as CartProductType } from '../../types/cartProduct.type';
import AttributeItems from '../AttributeItems/AttributeItems';
import './CartProduct.scss';

interface CartProductProps {
  cartProduct: CartProductType;
}
class CartProduct extends React.Component<CartProductProps> {
  render() {
    const { cartProduct } = this.props;

    return (
      <div className='cartProduct'>
        <div className='cartProduct__info'>
          <span className='cartProduct__brand'>{cartProduct.product.brand}</span>
          <span className='cartProduct__name'>{cartProduct.product.name}</span>
          <span className='cartProduct__price'>{cartProduct.product.prices[0].amount}</span>
          {cartProduct.product.attributes.map(attr => (
            <div className='cartProduct__attribute' key={attr.id}>
              <span className='cartProduct__attribute__title'>{attr.name}:</span>
              <AttributeItems attribute={attr} selectedItem={cartProduct.selectedAttributes.find(a => attr.id === a.attributeId)?.itemId} small />
            </div>
          ))}
        </div>
        <div className='cartProduct__buttons'>
          <button className='cartProduct__button'>+</button>
          <span className='cartProduct__quantity'>{cartProduct.quantity}</span>
          <button className='cartProduct__button'>-</button>
        </div>
        <img className='cartProduct__image' src={cartProduct.product.gallery[0]} />
      </div>
    );
  }
}

export default CartProduct;
