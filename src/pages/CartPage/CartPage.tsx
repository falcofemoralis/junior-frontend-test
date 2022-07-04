import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BasicLayout } from '../../components/BasicLayout/BasicLayout';
import CartItem from '../../components/CartItem/CartItem';
import { AppDispatch, RootState } from '../../store';
import { addToCart, removeFromCart, selectProducts, selectProductsCount, selectTotalPrice } from '../../store/reducers/cartReducer';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import { CartItem as CartItemType } from '../../types/cartItem.type';
import { getProductKey } from '../../utils/getProductKey';
import './CartPage.scss';

class CartPage extends React.Component<PropsFromRedux> {
  getTax(totalPrice: number) {
    return (totalPrice * 100) / 79 - totalPrice;
  }

  render() {
    const { cartItems, productsAmount, totalPrice, currency } = this.props;
    return (
      <BasicLayout>
        <div className='cartPage'>
          <span className='cartPage__title'>Cart</span>
          <div className='cartPage__divider'></div>
          {cartItems.map(item => (
            <div key={getProductKey(item)}>
              <CartItem cartItem={item} gallery />
              <div className='cartPage__divider'></div>
            </div>
          ))}
          <div className='cartPage__panel'>
            <div className='cartPage__row'>
              <span className='cartPage__name'>Tax 21%:</span>
              <span className='cartPage__amount'>
                {currency?.symbol}
                {this.getTax(totalPrice).toFixed(2)}
              </span>
            </div>
            <div className='cartPage__row'>
              <span className='cartPage__name'>Quantity:</span>
              <span className='cartPage__amount'>{productsAmount}</span>
            </div>
            <div className='cartPage__row'>
              <span className='cartPage__name'>Total:</span>
              <span className='cartPage__amount'>
                {currency?.symbol}
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <button className='cartPage__order'>Order</button>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  productsAmount: selectProductsCount(state),
  cartItems: selectProducts(state),
  currency: selectCurrency(state),
  totalPrice: selectTotalPrice(state)
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: CartItemType) => dispatch(addToCart(product)),
  removeFromCart: (product: CartItemType) => dispatch(removeFromCart(product))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartPage);
