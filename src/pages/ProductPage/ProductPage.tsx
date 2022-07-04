import DOMPurify from 'dompurify';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AttributeItems from '../../components/AttributeItems/AttributeItems';
import { BasicLayout } from '../../components/BasicLayout/BasicLayout';
import productService from '../../services/ProductService/product.service';
import { AppDispatch, RootState } from '../../store';
import { addToCart } from '../../store/reducers/cartReducer';
import { CartItem, SelectedAttribute } from '../../types/cartItem.type';
import { Product } from '../../types/product.type';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import './ProductPage.scss';
import { getPriceString } from '../../utils/getPrice';

interface RouteParams {
  id: string;
}
type ProductPageProps = RouteComponentProps<RouteParams> & PropsFromRedux;
interface ProductPageState {
  product: Product | null;
  currentImageIndex: number;
  selectedAttributes: SelectedAttribute[];
  error: string;
}
class ProductPage extends React.Component<ProductPageProps, ProductPageState> {
  constructor(props: ProductPageProps) {
    super(props);
    this.state = { product: null, currentImageIndex: 0, selectedAttributes: [], error: '' };

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
    if (this.state.error) {
      this.setState({ error: '' });
    }

    this.setState(state => {
      const { selectedAttributes } = state;

      if (selectedAttributes.find(attr => attr.attributeId == attributeId)) {
        // update element
        return {
          selectedAttributes: selectedAttributes.map(obj => {
            if (obj.attributeId === attributeId) {
              return { ...obj, itemId };
            }

            return obj;
          })
        };
      } else {
        // add element
        return { selectedAttributes: [...selectedAttributes, { attributeId, itemId }] };
      }
    });
  }

  addProductToCart() {
    const { selectedAttributes, product } = this.state;

    if (product) {
      if (selectedAttributes.length != product.attributes.length) {
        this.setState({ error: 'Select attributes!' });
        return;
      }

      const cartItem: CartItem = {
        quantity: 1,
        selectedAttributes: [...selectedAttributes],
        product
      };

      this.props.addToCart(cartItem);
    }
  }

  render() {
    const { currency } = this.props;
    const { product, error } = this.state;

    if (!product) {
      return <div>Loading</div>;
    }

    return (
      <BasicLayout>
        <div className='productPage'>
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
          <div className='product'>
            <span className='product__brand'>{product.brand}</span>
            <span className='product__name'>{product.name}</span>
            <div className='attribute '>
              {product.attributes.map(attr => (
                <div className='attribute__item' key={attr.id}>
                  <span className='attribute__title'>{attr.name}:</span>
                  <AttributeItems attribute={attr} onAttributeItemSelect={this.onAttributeItemSelect} selectable={product.inStock} />
                </div>
              ))}
            </div>
            <span className='attribute__title product__price-title'>Price:</span>
            <span className='product__price'>{getPriceString(product, currency)}</span>
            <button className='product__add' onClick={this.addProductToCart} disabled={!product.inStock}>
              Add To Cart
            </button>
            {error && <span className='product__hint'>{error}</span>}
            <span className='product__description' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></span>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: selectCurrency(state)
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: CartItem) => dispatch(addToCart(product))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(ProductPage));
