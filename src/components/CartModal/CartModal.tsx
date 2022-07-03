import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addToCart, removeFromCart, selectProducts } from '../../store/reducers/cartReducer';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import { CartItem as CartItemType } from '../../types/cartItem.type';
import { Currency } from '../../types/product.type';
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

  getTotal() {
    return this.props.cartItems.reduce((acc, current) => (acc += getPrice(current.product, this.props.currency).amount * current.quantity), 0);
  }

  render() {
    const { cartItems, addToCart, removeFromCart, currency } = this.props;

    return this.props.open ? (
      <div className='cartModal'>
        <div className={`cartModal__inner ${cartItems.length == 0 ? 'cartModal__inner-empty' : ''}`}>
          <span className='cartModal__title'>My Bag, {cartItems.length} items</span>
          {cartItems.map(cartItem => (
            <CartItem key={this.getProductKey(cartItem)} cartItem={cartItem} onAdd={addToCart} onRemove={removeFromCart}></CartItem>
          ))}
        </div>
        <div className='cartModal__panel'>
          <div className='cartModal__row'>
            <span className='cartModal__total'>Total</span>
            <span className='cartModal__price'>
              {currency?.symbol} {this.getTotal()}
            </span>
          </div>
          <div className='cartModal__row'>
            <button className='cartModal__bag'>View Bag</button>
            <button className='cartModal__check'>Check Out</button>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state: RootState) => ({
  cartItems: selectProducts(state),
  currency: selectCurrency(state)
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: CartItemType) => dispatch(addToCart(product)),
  removeFromCart: (product: CartItemType) => dispatch(removeFromCart(product))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartModal);
