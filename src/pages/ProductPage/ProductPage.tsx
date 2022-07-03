import DOMPurify from 'dompurify';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AttributeItems from '../../components/AttributeItems/AttributeItems';
import { BasicLayout } from '../../components/BasicLayout/BasicLayout';
import productService from '../../services/ProductService/product.service';
import { AppDispatch } from '../../store';
import { addToCart } from '../../store/reducers/cartReducer';
import { CartItem, SelectedAttribute } from '../../types/cartItem.type';
import { Product } from '../../types/product.type';
import './ProductPage.scss';

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
    const { product, error } = this.state;

    if (!product) {
      return <div>Loading</div>;
    }

    return (
      <BasicLayout>
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
                  <AttributeItems attribute={attr} onAttributeItemSelect={this.onAttributeItemSelect} selectable={product.inStock} />
                </div>
              ))}
            </div>
            <span className='attribute__title'>Price:</span>
            <span className='product__price'>
              {product.prices[0].currency.symbol}
              {product.prices[0].amount}
            </span>
            <button className='product__add' onClick={this.addProductToCart} disabled={!product.inStock}>
              ADD TO CART
            </button>
            {error && <span className='product__hint'>{error}</span>}
            <span className='product__description' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></span>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: CartItem) => dispatch(addToCart(product))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(ProductPage));
