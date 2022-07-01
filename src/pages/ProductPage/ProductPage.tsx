import DOMPurify from 'dompurify';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AttributeItems from '../../components/AttributeItems/AttributeItems';
import { withLayout } from '../../components/hoc/BasicLayout';
import productService from '../../services/ProductService/product.service';
import { AppDispatch, RootState } from '../../store';
import { addToCart } from '../../store/reducers/cartReducer';
import { CartProduct } from '../../types/cartProduct.type';
import { Product } from '../../types/product.type';
import './ProductPage.scss';

interface RouteParams {
  id: string;
}
type ProductPageProps = RouteComponentProps<RouteParams> & PropsFromRedux;
interface ProductPageState {
  product: Product | null;
  currentImageIndex: number;
  selectedAttributes: Map<string, string>;
}
class ProductPage extends React.Component<ProductPageProps, ProductPageState> {
  constructor(props: ProductPageProps) {
    super(props);
    this.state = { product: null, currentImageIndex: 0, selectedAttributes: new Map() };

    this.onAttributeItemSelect = this.onAttributeItemSelect.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  componentDidMount() {
    this.initProduct();
  }

  async initProduct() {
    const id = this.props.match.params.id;
    const product = await productService.getProduct(id);
    this.setState({ product: product });
  }

  onImageSelect(index: number) {
    this.setState({ currentImageIndex: index });
  }

  onAttributeItemSelect(attributeId: string, itemId: string) {
    this.setState(state => {
      const selectedAttributes = state.selectedAttributes;
      selectedAttributes.set(attributeId, itemId);
      return { selectedAttributes };
    });
  }

  addProductToCart() {
    console.log('add');
    console.log(this.state.selectedAttributes);
    this.props.addToCart()
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return <div>Loading</div>;
    }

    return (
      <div className='product'>
        <div className='gallery'>
          <ul className='gallery__list'>
            {product.gallery.map((img, index) => (
              <li className='gallery__item' key={img}>
                <img className='gallery__image' src={img} alt={img} onClick={() => this.onImageSelect(index)} />
              </li>
            ))}
          </ul>
          <img className='gallery__image-selected' src={product.gallery[this.state.currentImageIndex]} />
        </div>
        <div className='product__info'>
          <span className='product__brand'>{product.brand}</span>
          <span className='product__title'>{product.name}</span>
          <div className='attribute '>
            {product.attributes.map(attr => (
              <div className='attribute__item' key={attr.id}>
                <span className='attribute__title'>{attr.name}:</span>
                <AttributeItems attribute={attr} onAttributeItemSelect={this.onAttributeItemSelect} />
              </div>
            ))}
          </div>
          <span className='attribute__title'>Price:</span>
          <span className='product__price'>
            {product.prices[0].currency.symbol}
            {product.prices[0].amount}
          </span>
          <button className='product__add' onClick={this.addProductToCart}>
            ADD TO CART
          </button>
          {/* TODO description style */}
          <span className='product__description' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.cart.products
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (products: CartProduct[]) => dispatch(addToCart(products))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withLayout(withRouter(connector(ProductPage)));
