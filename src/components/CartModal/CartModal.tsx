import classNames from 'classnames';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { selectProducts, selectTotalPrice } from '../../store/reducers/cartReducer';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import { getProductKey } from '../../utils/getProductKey';
import CartItem from '../CartItem/CartItem';
import './CartModal.scss';

interface CartModalProps extends PropsFromRedux {
  open: boolean;
}
class CartModal extends React.Component<CartModalProps> {
  handleOrderPress() {
    alert('Your order is ready!');
  }

  render() {
    const { open, cartItems, currency, totalPrice } = this.props;

    return (
      <div>
        <div className={classNames('cartModal', { 'cartModal-visible': open })}>
          <div className={classNames('cartModal__inner')}>
            <div className='cartModal__title'>
              <span className='cartModal__title-name'>My Bag</span>
              {cartItems.length > 0 && <span className='cartModal__title-count  '>, {cartItems.length} items</span>}
            </div>
            {cartItems.length == 0 && <span className='cartModal__title-count'>Your cart is empty!</span>}
            {cartItems.map(cartItem => (
              <CartItem className='cartModal__item' key={getProductKey(cartItem)} cartItem={cartItem} small></CartItem>
            ))}
          </div>
          {cartItems.length > 0 && (
            <div className='cartModal__panel'>
              <div className='cartModal__row'>
                <span className='cartModal__total'>Total</span>
                <span className='cartModal__price'>
                  {currency?.symbol}
                  {totalPrice.toFixed(2)}
                </span>
              </div>
              <div className='cartModal__row'>
                <Link className='cartModal__bag' to='/cart'>
                  View Bag
                </Link>
                <button className='cartModal__check' onClick={this.handleOrderPress}>
                  Check Out
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={classNames('cartModal__mask', { 'cartModal-visible': open })}></div>
      </div>
    );
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
