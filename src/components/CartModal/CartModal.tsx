import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import productService from '../../services/ProductService/product.service';
import { AppDispatch, RootState } from '../../store';
import { addToCart, getLocalCart, initCart, removeFromCart, selectProducts } from '../../store/reducers/cartReducer';
import { CartItem as CartItemType } from '../../types/cartItem.type';
import CartItem from '../CartItem/CartItem';
import './CartModal.scss';

interface CartModalProps extends PropsFromRedux {
  open: boolean;
}
class CartModal extends React.Component<CartModalProps> {
  componentDidMount() {
    this.initProducts();
  }

  async initProducts() {
    const localCartItems = getLocalCart();
    if (localCartItems) {
      const items: CartItemType[] = [];

      for (const item of localCartItems) {
        const product = await productService.getProduct(item.productId);
        items.push({ product, quantity: item.quantity, selectedAttributes: item.selectedAttributes });
      }

      this.props.initCart(items);
    }
  }

  getProductKey(product: CartItemType) {
    let key = `${product.product.id}`;
    for (const attr of product.selectedAttributes) {
      key += `-${attr.attributeId}-${attr.itemId}`;
    }

    return key;
  }

  getTotal() {
    return this.props.cartItems.reduce((acc, current) => (acc += current.product.prices[0].amount * current.quantity), 0);
  }

  render() {
    const { cartItems, addToCart, removeFromCart } = this.props;

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
            <span className='cartModal__price'>{this.getTotal()}</span>
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
  cartItems: selectProducts(state)
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  initCart: (items: CartItemType[]) => dispatch(initCart(items)),
  addToCart: (product: CartItemType) => dispatch(addToCart(product)),
  removeFromCart: (product: CartItemType) => dispatch(removeFromCart(product))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartModal);
