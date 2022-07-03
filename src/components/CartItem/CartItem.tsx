import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import { CartItem as CartItemType } from '../../types/cartItem.type';
import { getPriceString } from '../../utils/getPrice';
import AttributeItems from '../AttributeItems/AttributeItems';
import './CartItem.scss';

interface CartItemProps extends PropsFromRedux {
  cartItem: CartItemType;
  onAdd: (cartItem: CartItemType) => void;
  onRemove: (cartItem: CartItemType) => void;
}
class CartItem extends React.Component<CartItemProps> {
  render() {
    const { cartItem, onAdd, onRemove, currency } = this.props;

    return (
      <div className='cartItem'>
        <div className='cartItem__main'>
          <div className='cartItem__info'>
            <span className='cartItem__brand'>{cartItem.product.brand}</span>
            <span className='cartItem__name'>{cartItem.product.name}</span>
            <span className='cartItem__price'>{getPriceString(cartItem.product, currency)}</span>
            {cartItem.product.attributes.map(attr => (
              <div className='cartItem__attribute' key={attr.id}>
                <span className='cartItem__attribute__title'>{attr.name}:</span>
                <AttributeItems attribute={attr} selectedItem={cartItem.selectedAttributes.find(a => attr.id === a.attributeId)?.itemId} small />
              </div>
            ))}
          </div>
          <div className='cartItem__buttons'>
            <button className='cartItem__button' onClick={() => onAdd(cartItem)}>
              +
            </button>
            <span className='cartItem__quantity'>{cartItem.quantity}</span>
            <button className='cartItem__button' onClick={() => onRemove(cartItem)}>
              -
            </button>
          </div>
        </div>
        <img className='cartItem__image' src={cartItem.product.gallery[0]} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: selectCurrency(state)
});
const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartItem);
