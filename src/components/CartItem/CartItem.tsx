import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import { CartItem as CartItemType } from '../../types/cartItem.type';
import { getPriceString } from '../../utils/getPrice';
import AttributeItems from '../AttributeItems/AttributeItems';
import { addToCart, removeFromCart } from '../../store/reducers/cartReducer';
import './CartItem.scss';
import MinusIcon from '../../assets/minus.svg';
import PlusIcon from '../../assets/plus.svg';
import LeftArrowIcon from '../../assets/left_arrow.svg';
import RightArrowIcon from '../../assets/right_arrow.svg';
import classNames from 'classnames';

interface CartItemProps extends PropsFromRedux {
  cartItem: CartItemType;
  small?: boolean;
  gallery?: boolean;
  className?: string;
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
    const { cartItem, currency, addToCart, removeFromCart, small, gallery, className } = this.props;

    return (
      <div className={`cartItem ${className}`}>
        <div className='cartItem__main'>
          <div className='cartItem__info'>
            <span className={small ? 'cartItem__brand-small' : 'cartItem__brand'}>{cartItem.product.brand}</span>
            <span className={small ? 'cartItem__name-small' : 'cartItem__name'}>{cartItem.product.name}</span>
            <span className={small ? 'cartItem__price-small' : 'cartItem__price'}>{getPriceString(cartItem.product, currency)}</span>
            {cartItem.product.attributes.map(attr => (
              <div className='cartItem__attribute' key={attr.id}>
                <span className={small ? 'cartItem__attribute-title-small' : 'cartItem__attribute-title'}>{attr.name}:</span>
                <AttributeItems attribute={attr} selectedItem={cartItem.selectedAttributes.find(a => attr.id === a.attributeId)?.itemId} small={small} />
              </div>
            ))}
          </div>
          <div className='cartItem__buttons'>
            <button className={classNames('cartItem__button', { 'cartItem__button-small': small })} onClick={() => addToCart(cartItem)}>
              <img className='cartItem__button-icon' src={PlusIcon} />
            </button>
            <span className={small ? 'cartItem__quantity-small' : 'cartItem__quantity'}>{cartItem.quantity}</span>
            <button className={classNames('cartItem__button', { 'cartItem__button-small': small })} onClick={() => removeFromCart(cartItem)}>
              <img className='cartItem__button-icon' src={MinusIcon} />
            </button>
          </div>
        </div>
        <div className='cartGallery'>
          {gallery && cartItem.product.gallery.length > 1 && (
            <div className='cartGallery__buttons'>
              <button onClick={() => this.changeImage(true)} className='cartGallery__button'>
                <img src={LeftArrowIcon} />
              </button>
              <button onClick={() => this.changeImage(false)} className='cartGallery__button'>
                <img src={RightArrowIcon} />
              </button>
            </div>
          )}
          <img className={classNames('cartItem__image', { 'cartItem__image-small': small })} src={cartItem.product.gallery[this.state.currentImageIndex]} />
        </div>
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
