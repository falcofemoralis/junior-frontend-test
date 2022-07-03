import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import { CartItem as CartItemType } from '../../types/cartItem.type';
import { getPriceString } from '../../utils/getPrice';
import AttributeItems from '../AttributeItems/AttributeItems';
import { addToCart, removeFromCart } from '../../store/reducers/cartReducer';
import './CartItem.scss';

interface CartItemProps extends PropsFromRedux {
  cartItem: CartItemType;
  small?: boolean;
  gallery?: boolean;
}
interface CartItemState {
  currentImageIndex: number;
}
class CartItem extends React.Component<CartItemProps, CartItemState> {
  constructor(props: CartItemProps) {
    super(props);
    this.state = { currentImageIndex: 0 };

    this.changeImage = this.changeImage.bind(this);
  }

  changeImage(next: boolean) {
    this.setState(prev => {
      const gallerySize = this.props.cartItem.product.gallery.length - 1;
      let nextIndex = next ? prev.currentImageIndex + 1 : prev.currentImageIndex - 1;

      if (nextIndex > gallerySize) {
        nextIndex = 0;
      }

      if (nextIndex < 0) {
        nextIndex = gallerySize;
      }

      return { currentImageIndex: nextIndex };
    });
  }

  render() {
    const { cartItem, currency, addToCart, removeFromCart, small, gallery } = this.props;

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
                <AttributeItems attribute={attr} selectedItem={cartItem.selectedAttributes.find(a => attr.id === a.attributeId)?.itemId} small={small} />
              </div>
            ))}
          </div>
          <div className='cartItem__buttons'>
            <button className='cartItem__button' onClick={() => addToCart(cartItem)}>
              +
            </button>
            <span className='cartItem__quantity'>{cartItem.quantity}</span>
            <button className='cartItem__button' onClick={() => removeFromCart(cartItem)}>
              -
            </button>
          </div>
        </div>
        {gallery && (
          <>
            <button onClick={() => this.changeImage(true)}>Next</button>
            <button onClick={() => this.changeImage(false)}>Pre</button>
          </>
        )}
        <img className={`cartItem__image ${small ? 'cartItem__image-small' : ''}`} src={cartItem.product.gallery[this.state.currentImageIndex]} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: selectCurrency(state)
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: CartItemType) => dispatch(addToCart(product)),
  removeFromCart: (product: CartItemType) => dispatch(removeFromCart(product))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartItem);
