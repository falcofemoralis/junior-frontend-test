import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { selectProducts, selectTotalPrice } from '../../store/reducers/cartReducer';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import { CartItem as CartItemType } from '../../types/cartItem.type';
import { getPrice } from '../../utils/getPrice';
import CartItem from '../CartItem/CartItem';
import './CartModal.scss';

interface CartModalProps extends PropsFromRedux {
  open: boolean;
}
class CartModal extends React.Component<CartModalProps> {
  getProductKey(product: CartItemType) {
    let key = `${product.product.id}`;
    for (const attr of product.selectedAttributes) {
      key += `-${attr.attributeId}-${attr.itemId}`;
    }

    return key;
  }

  render() {
    const { cartItems, currency, totalPrice } = this.props;

    return this.props.open ? (
      <div className='cartModal'>
        <div className={`cartModal__inner ${cartItems.length == 0 ? 'cartModal__inner-empty' : ''}`}>
          <span className='cartModal__title'>My Bag, {cartItems.length} items</span>
          {cartItems.map(cartItem => (
            <CartItem key={this.getProductKey(cartItem)} cartItem={cartItem} small></CartItem>
          ))}
        </div>
        <div className='cartModal__panel'>
          <div className='cartModal__row'>
            <span className='cartModal__total'>Total</span>
            <span className='cartModal__price'>
              {currency?.symbol} {totalPrice.toFixed(2)}
            </span>
          </div>
          <div className='cartModal__row'>
            <Link className='cartModal__bag' to='/cart'>
              View Bag
            </Link>
            <button className='cartModal__check'>Check Out</button>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state: RootState) => ({
  cartItems: selectProducts(state),
  totalPrice: selectTotalPrice(state),
  currency: selectCurrency(state)
});
const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartModal);
