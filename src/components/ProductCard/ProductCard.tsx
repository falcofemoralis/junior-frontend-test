import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import CartIcon from '../../assets/cart_white.svg';
import productService from '../../services/ProductService/product.service';
import { AppDispatch } from '../../store';
import { addToCart } from '../../store/reducers/cartReducer';
import { CartItem, SelectedAttribute } from '../../types/cartItem.type';
import { Product } from '../../types/product.type';
import './ProductCard.scss';

interface ProductCardProps extends PropsFromRedux {
  product: Product;
}
class ProductCard extends React.Component<ProductCardProps> {
  constructor(props: ProductCardProps) {
    super(props);

    this.addProduct = this.addProduct.bind(this);
  }

  async addProduct() {
    const product = await productService.getProduct(this.props.product.id);

    const selectedAttributes: SelectedAttribute[] = [];

    for (const attr of product.attributes) {
      selectedAttributes.push({ attributeId: attr.id, itemId: attr.items[0].id });
    }

    const cartItem: CartItem = {
      quantity: 1,
      selectedAttributes,
      product
    };

    this.props.addToCart(cartItem);
  }

  render() {
    const { product } = this.props;

    return (
      <div className='productCard'>
        <Link className='productCard__link' to={`/product/${product.id}`}>
          <div className='productCard__image__container'>
            {!product.inStock && <span className='productCard__stock'>Out of Stock</span>}
            <img className={`productCard__image ${!product.inStock ? 'productCard__image-stock' : ''}`} src={product.gallery[0]} alt={product.name} />
          </div>
          <span className='productCard__name'>
            {product.brand} {product.name}
          </span>
          <span className='productCard__price'>
            {product.prices[0].currency.symbol}
            {product.prices[0].amount}
          </span>
        </Link>
        {product.inStock && (
          <button className='productCard__cart' onClick={this.addProduct}>
            <img className='productCard__cart__image' src={CartIcon} alt={'cart_icon'} />
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: CartItem) => dispatch(addToCart(product))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductCard);
