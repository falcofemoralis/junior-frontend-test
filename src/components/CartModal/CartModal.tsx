import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import CartProduct from '../CartProduct/CartProduct';
import './CartModal.scss';

interface CartModalProps extends PropsFromRedux {
  open: boolean;
}
class CartModal extends React.Component<CartModalProps> {
  render() {
    const { cartProducts } = this.props;

    return this.props.open ? (
      <div className='cartModal'>
        <div className='cartModal__inner'>
          <span className='cartModal__title'>My Bag, {cartProducts.length}</span>
          {cartProducts.map(cartProduct => (
            <CartProduct key={cartProduct.product.id} cartProduct={cartProduct}></CartProduct>
          ))}
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state: RootState) => ({
  cartProducts: state.cart.products
});
const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartModal);
